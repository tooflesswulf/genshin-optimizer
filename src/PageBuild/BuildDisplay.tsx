import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material';
import { Alert, Box, Button, ButtonGroup, CardContent, Divider, Grid, Link, MenuItem, Skeleton, ToggleButton, Typography } from '@mui/material';
import React, { lazy, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import ReactGA from 'react-ga';
import { Link as RouterLink } from 'react-router-dom';
// eslint-disable-next-line
import Worker from "worker-loader!./BackgroundWorker";
import ArtifactLevelSlider from '../Components/Artifact/ArtifactLevelSlider';
import CardDark from '../Components/Card/CardDark';
import CardLight from '../Components/Card/CardLight';
import CharacterDropdownButton from '../Components/Character/CharacterDropdownButton';
import CloseButton from '../Components/CloseButton';
import DropdownButton from '../Components/DropdownMenu/DropdownButton';
import InfoComponent from '../Components/InfoComponent';
import ModalWrapper from '../Components/ModalWrapper';
import SolidToggleButtonGroup from '../Components/SolidToggleButtonGroup';
import StatFilterCard from '../Components/StatFilterCard';
import { DatabaseContext } from '../Database/Database';
import { DataContext, dataContextObj, TeamData } from '../DataContext';
import { mergeData, uiDataForTeam } from '../Formula/api';
import { uiInput as input } from '../Formula/index';
import { optimize } from '../Formula/optimization';
import { NumNode } from '../Formula/type';
import { initGlobalSettings } from '../GlobalSettings';
import KeyMap from '../KeyMap';
import CharacterCard from '../PageCharacter/CharacterCard';
import useCharacter from '../ReactHooks/useCharacter';
import useCharacterReducer from '../ReactHooks/useCharacterReducer';
import useCharSelectionCallback from '../ReactHooks/useCharSelectionCallback';
import useDBState from '../ReactHooks/useDBState';
import useForceUpdate from '../ReactHooks/useForceUpdate';
import usePromise from '../ReactHooks/usePromise';
import useTeamData, { getTeamData } from '../ReactHooks/useTeamData';
import { BuildSetting } from '../Types/Build';
import { allSlotKeys, ArtifactSetKey, CharacterKey } from '../Types/consts';
import { SubstatKey } from "../Types/artifact"
import { objectMap, objPathValue } from '../Util/Util';
import { Build, ChartData, Finalize, FinalizeResult, Request, Setup, WorkerResult } from './background';
import { maxBuildsToShowList } from './Build';
import { initialBuildSettings } from './BuildSetting';
import ChartCard from './ChartCard';
import { countBuilds, filterArts, mergeBuilds, mergePlot, pruneAll } from './common';
import ArtifactBuildDisplayItem from './Components/ArtifactBuildDisplayItem';
import ArtifactConditionalCard from './Components/ArtifactConditionalCard';
import ArtifactSetPicker from './Components/ArtifactSetPicker';
import BonusStatsCard from './Components/BonusStatsCard';
import BuildAlert, { warningBuildNumber } from './Components/BuildAlert';
import EnemyEditorCard from './Components/EnemyEditorCard';
import HitModeCard from './Components/HitModeCard';
import MainStatSelectionCard from './Components/MainStatSelectionCard';
import OptimizationTargetSelector from './Components/OptimizationTargetSelector';
import TeamBuffCard from './Components/TeamBuffCard';
import { artSetPerm, compactArtifacts, dynamicData, splitFiltersBySet } from './foreground';
import { queryDebug, QueryBuild, QueryArtifact } from '../Formula/artifactQuery'
import Artifact from "../Data/Artifacts/Artifact";

const InfoDisplay = React.lazy(() => import('./InfoDisplay'));
const doquery = true;

//lazy load the character display
const CharacterDisplayCard = lazy(() => import('../PageCharacter/CharacterDisplayCard'))

function buildSettingsReducer(state: BuildSetting, action): BuildSetting {
  switch (action.type) {
    case 'mainStatKey': {
      const { slotKey, mainStatKey } = action
      const mainStatKeys = { ...state.mainStatKeys }//create a new object to update react dependencies

      if (state.mainStatKeys[slotKey].includes(mainStatKey))
        mainStatKeys[slotKey] = mainStatKeys[slotKey].filter(k => k !== mainStatKey)
      else
        mainStatKeys[slotKey].push(mainStatKey)
      return { ...state, mainStatKeys }
    }
    case 'mainStatKeyReset': {
      const { slotKey } = action
      const mainStatKeys = { ...state.mainStatKeys }//create a new object to update react dependencies
      mainStatKeys[slotKey] = []
      return { ...state, mainStatKeys }
    }
    case `setFilter`: {
      const { index, key, num = 0 } = action
      state.setFilters[index] = { key, num }
      return { ...state, setFilters: [...state.setFilters] }//do this because this is a dependency, so needs to be a "new" array
    }
    default:
      break;
  }
  return { ...state, ...action }
}
function initialBuildDisplayState(): {
  characterKey: CharacterKey | ""
} {
  return {
    characterKey: ""
  }
}

export default function BuildDisplay({ location: { characterKey: propCharacterKey } }) {
  const [{ tcMode }] = useDBState("GlobalSettings", initGlobalSettings)
  const { database } = useContext(DatabaseContext)
  const [{ characterKey }, setBuildSettings] = useDBState("BuildDisplay", initialBuildDisplayState)
  const setcharacterKey = useCallback(characterKey => {
    if (characterKey && database._getChar(characterKey)) setBuildSettings({ characterKey })
    else setBuildSettings({ characterKey: "" })
  }, [setBuildSettings, database])

  // propCharacterKey can override the selected character, on initial load. This is intended to run on component startup.
  useEffect(() => {
    if (propCharacterKey && propCharacterKey !== characterKey)
      setcharacterKey(propCharacterKey)
    // eslint-disable-next-line
  }, [])

  const [modalBuildIndex, setmodalBuildIndex] = useState(-1) // the index of the newBuild that is being displayed in the character modal,

  const [generatingBuilds, setgeneratingBuilds] = useState(false)
  const [generationProgress, setgenerationProgress] = useState(0)
  const [generationDuration, setgenerationDuration] = useState(0)//in ms
  const [generationSkipped, setgenerationSkipped] = useState(0)

  const [chartData, setchartData] = useState(undefined as ChartData | undefined)

  const [artsDirty, setArtsDirty] = useForceUpdate()

  const setCharacter = useCharSelectionCallback()
  const characterDispatch = useCharacterReducer(characterKey)
  const character = useCharacter(characterKey)
  const buildSettings = character?.buildSettings ?? initialBuildSettings()
  const { plotBase, setFilters, statFilters, mainStatKeys, optimizationTarget, mainStatAssumptionLevel, useExcludedArts, useEquippedArts, builds, buildDate, maxBuildsToShow, levelLow, levelHigh } = buildSettings
  const teamData = useTeamData(characterKey, mainStatAssumptionLevel)
  const { characterSheet, target: data } = teamData?.[characterKey as CharacterKey] ?? {}

  const teamDataBuilds = usePromise(Promise.all(builds.map(async (b) => {
    if (!characterKey) return undefined
    const result = await getTeamData(database, characterKey, mainStatAssumptionLevel, b.filter(a => a).map(a => database._getArt(a)!))
    if (!result) return null
    const { teamData, teamBundle } = result

    const calcData = uiDataForTeam(teamData, characterKey)
    const data = objectMap(calcData, (obj, ck) => {
      const { data: _, ...rest } = teamBundle[ck]!
      return { ...obj, ...rest }
    })
    return data
  })).then(arr => arr.map(a => a)), [teamData, builds, database, characterKey, mainStatAssumptionLevel]) ?? []

  const compareData = character?.compareData ?? false

  const noCharacter = useMemo(() => !database._getCharKeys().length, [database])
  const noArtifact = useMemo(() => !database._getArts().length, [database])

  const buildSettingsDispatch = useCallback((action) =>
    characterDispatch && characterDispatch({ buildSettings: buildSettingsReducer(buildSettings, action) })
    , [characterDispatch, buildSettings])

  useEffect(() => ReactGA.pageview('/build'), [])

  //select a new character Key
  const selectCharacter = useCallback((cKey = "") => {
    if (characterKey === cKey) return
    setcharacterKey(cKey)
    setchartData(undefined)
  }, [setcharacterKey, characterKey])

  //register changes in artifact database
  useEffect(() =>
    database.followAnyArt(setArtsDirty),
    [setArtsDirty, database])

  const { split, setPerms, totBuildNumber } = useMemo(() => {
    if (!characterKey) // Make sure we have all slotKeys
      return { totBuildNumber: 0 }
    const arts = database._getArts().filter(art => {
      if (art.level < levelLow) return false
      if (art.level > levelHigh) return false
      const mainStats = mainStatKeys[art.slotKey]
      if (mainStats?.length && !mainStats.includes(art.mainStatKey)) return false

      // If its equipped on the selected character, bypass the check
      if (art.location === characterKey) return true

      if (art.exclude && !useExcludedArts) return false
      if (art.location && !useEquippedArts) return false
      return true
    })
    const split = compactArtifacts(arts, mainStatAssumptionLevel)
    const setPerms = [...artSetPerm([setFilters])]
    const totBuildNumber = [...setPerms].map(perm => countBuilds(filterArts(split, perm))).reduce((a, b) => a + b, 0)
    return artsDirty && { split, setPerms, totBuildNumber }
  }, [characterKey, useExcludedArts, useEquippedArts, mainStatKeys, setFilters, levelLow, levelHigh, artsDirty, database, mainStatAssumptionLevel])

  // Reset the Alert by setting progress to zero.
  useEffect(() => {
    setgenerationProgress(0)
  }, [totBuildNumber])

  // Provides a function to cancel the work
  const cancelToken = useRef(() => { })
  //terminate worker when component unmounts
  useEffect(() => () => cancelToken.current(), [])
  const generateBuilds = useCallback(async () => {
    if (!characterKey || !optimizationTarget || !split || !setPerms) return
    const teamData = await getTeamData(database, characterKey, mainStatAssumptionLevel, [])
    if (!teamData) return
    const workerData = uiDataForTeam(teamData.teamData, characterKey)[characterKey as CharacterKey]?.target.data![0]
    if (!workerData) return
    Object.assign(workerData, mergeData([workerData, dynamicData])) // Mark art fields as dynamic
    let optimizationTargetNode = objPathValue(workerData.display ?? {}, optimizationTarget) as NumNode | undefined
    if (!optimizationTargetNode) return
    const targetNode = optimizationTargetNode
    const valueFilter: { value: NumNode, minimum: number }[] = Object.entries(statFilters).map(([key, value]) => {
      if (key.endsWith("_")) value = value / 100 // TODO: Conversion
      return { value: input.total[key], minimum: value }
    }).filter(x => x.value && x.minimum > -Infinity)

    console.log('generate builds pressed')
    if (doquery) {
      const queryArts: QueryArtifact[] = database._getArts().map(art => {
        const mainStatVal = Artifact.mainStatValue(art.mainStatKey, art.rarity, 20)
        const buildData = {
          id: art.id, slot: art.slotKey, level: art.level, rarity: art.rarity,
          values: {
            [art.setKey]: 1,
            [art.mainStatKey]: art.mainStatKey.endsWith('_') ? mainStatVal / 100 : mainStatVal,
            ...Object.fromEntries(art.substats.map(substat =>
              [substat.key, substat.key.endsWith('_') ? substat.accurateValue / 100 : substat.accurateValue]))
          },
          substatKeys: art.substats.reduce((sub: SubstatKey[], x) => {
            if (x.key != "") sub.push(x.key)
            return sub
          }, [])
        }
        delete buildData.values[""]
        return buildData
      })

      let curEquip: QueryBuild = Object.assign({}, ...allSlotKeys.map(slotKey => {
        const art = database._getArt(data?.get(input.art[slotKey].id).value ?? "")
        if (!art) return { [slotKey]: {} }

        const mainStatVal = Artifact.mainStatValue(art.mainStatKey, art.rarity, art.level)
        const buildData: QueryArtifact = {
          id: art.id, slot: slotKey, level: art.level, rarity: art.rarity,
          values: {
            [art.setKey]: 1,
            [art.mainStatKey]: art.mainStatKey.endsWith('_') ? mainStatVal / 100 : mainStatVal,
            ...Object.fromEntries(art.substats.map(substat =>
              [substat.key, substat.key.endsWith('_') ? substat.accurateValue / 100 : substat.accurateValue]))
          },
          substatKeys: art.substats.reduce((sub: SubstatKey[], x) => {
            if (x.key != "") sub.push(x.key)
            return sub
          }, [])
        }
        delete buildData.values[""]
        return { [slotKey]: buildData }
      }))

      let nodes = [...valueFilter.map(x => x.value), optimizationTargetNode], arts = split!
      nodes = optimize(nodes, workerData, ({ path: [p] }) => p !== "dyn");

      queryDebug(nodes, curEquip, workerData, queryArts)
      return
    }


    const t1 = performance.now()
    setgeneratingBuilds(true)
    setchartData(undefined)
    setgenerationDuration(0)
    setgenerationProgress(0)
    setgenerationSkipped(0)

    const cancelled = new Promise<void>(r => cancelToken.current = r)

    let nodes = [...valueFilter.map(x => x.value), optimizationTargetNode], arts = split!
    const origCount = totBuildNumber, minimum = [...valueFilter.map(x => x.minimum), -Infinity]
    if (plotBase) {
      nodes.push(input.total[plotBase])
      minimum.push(-Infinity)
    }

    nodes = optimize(nodes, workerData, ({ path: [p] }) => p !== "dyn");
    ({ nodes, arts } = pruneAll(nodes, minimum, arts, maxBuildsToShow,
      new Set(setFilters.map(x => x.key as ArtifactSetKey)), {
      reaffine: true, pruneArtRange: true, pruneNodeRange: true, pruneOrder: true
    }))

    const plotBaseNode = plotBase ? nodes.pop() : undefined
    optimizationTargetNode = nodes.pop()!

    let wrap = {
      buildCount: 0, failedCount: 0, skippedCount: origCount,
      buildValues: Array(maxBuildsToShow).fill(0).map(_ => -Infinity)
    }
    setPerms.forEach(filter => wrap.skippedCount -= countBuilds(filterArts(arts, filter)))

    const maxWorkers = navigator.hardwareConcurrency || 4

    const setPerm = splitFiltersBySet(arts, setPerms,
      maxWorkers === 1
        // Don't split for single worker
        ? Infinity
        // 8 perms / worker, up to 1M builds / perm
        : Math.min(origCount / maxWorkers / 4, 1_000_000))[Symbol.iterator]()

    function fetchWork(): Request | undefined {
      const { done, value } = setPerm.next()
      return done ? undefined : {
        command: "request",
        threshold: wrap.buildValues[maxBuildsToShow - 1], filter: value,
      }
    }

    const filters = nodes
      .map((value, i) => ({ value, min: minimum[i] }))
      .filter(x => x.min > -Infinity)

    const finalizedList: Promise<FinalizeResult>[] = []
    for (let i = 0; i < maxWorkers; i++) {
      const worker = new Worker()

      const setup: Setup = {
        command: "setup",
        id: `${i}`,
        arts,
        optimizationTarget: optimizationTargetNode,
        plotBase: plotBaseNode,
        maxBuilds: maxBuildsToShow,
        filters
      }
      worker.postMessage(setup, undefined)
      let finalize: (_: FinalizeResult) => void
      const finalized = new Promise<FinalizeResult>(r => finalize = r)
      worker.onmessage = async ({ data }: { data: WorkerResult }) => {
        switch (data.command) {
          case "interim":
            wrap.buildCount += data.buildCount
            wrap.failedCount += data.failedCount
            wrap.skippedCount += data.skippedCount
            if (data.buildValues) {
              wrap.buildValues.push(...data.buildValues)
              wrap.buildValues.sort((a, b) => b - a).splice(maxBuildsToShow)
            }
            break
          case "request":
            const work = fetchWork()
            if (work) {
              worker.postMessage(work)
            } else {
              const finalizeCommand: Finalize = { command: "finalize" }
              worker.postMessage(finalizeCommand)
            }
            break
          case "finalize": finalize(data); break
          default: console.log("DEBUG", data)
        }
      }

      cancelled.then(() => worker.terminate())
      finalizedList.push(finalized)
    }

    const buildTimer = setInterval(() => {
      setgenerationProgress(wrap.buildCount)
      setgenerationSkipped(wrap.skippedCount)
      setgenerationDuration(performance.now() - t1)
    }, 100)
    const results = await Promise.any([Promise.all(finalizedList), cancelled])
    clearInterval(buildTimer)
    cancelToken.current = () => { }

    if (!results) {
      setgenerationDuration(0)
      setgenerationProgress(0)
      setgenerationSkipped(0)
    } else {
      if (plotBase) {
        const plotData = mergePlot(results.map(x => x.plotData!))
        const plotBaseNode = input.total[plotBase] as NumNode
        let data = Object.values(plotData)
        if (KeyMap.unit(targetNode.info?.key) === "%")
          data = data.map(({ value, plot }) => ({ value: value * 100, plot })) as Build[]
        if (KeyMap.unit(plotBaseNode!.info?.key) === "%")
          data = data.map(({ value, plot }) => ({ value, plot: (plot ?? 0) * 100 })) as Build[]
        setchartData({
          valueNode: targetNode,
          plotNode: plotBaseNode,
          data
        })
      }
      const builds = mergeBuilds(results.map(x => x.builds), maxBuildsToShow)
      if (process.env.NODE_ENV === "development") console.log("Build Result", builds)
      buildSettingsDispatch({ builds: builds.map(build => build.artifactIds), buildDate: Date.now() })
      const totalDuration = performance.now() - t1

      setgenerationProgress(wrap.buildCount)
      setgenerationSkipped(wrap.skippedCount)
      setgenerationDuration(totalDuration)

      ReactGA.timing({
        category: "Build Generation",
        variable: "timing",
        value: totalDuration,
        label: totBuildNumber.toString()
      })
    }
    setgeneratingBuilds(false)
  }, [characterKey, database, totBuildNumber, mainStatAssumptionLevel, maxBuildsToShow, optimizationTarget, plotBase, setPerms, split, buildSettingsDispatch, setFilters, statFilters])

  const characterName = characterSheet?.name ?? "Character Name"

  const closeBuildModal = useCallback(() => setmodalBuildIndex(-1), [setmodalBuildIndex])
  const setPlotBase = useCallback(plotBase => {
    buildSettingsDispatch({ plotBase })
    setchartData(undefined)
  }, [buildSettingsDispatch])
  const dataContext: dataContextObj | undefined = data && characterSheet && character && teamData && {
    data,
    characterSheet,
    character,
    mainStatAssumptionLevel,
    teamData,
    characterDispatch
  }
  const selectedBuild = teamDataBuilds[modalBuildIndex]
  return <Box display="flex" flexDirection="column" gap={1} sx={{ my: 1 }}>
    <InfoComponent
      pageKey="buildPage"
      modalTitle="Character Management Page Guide"
      text={["For self-infused attacks, like Noelle's Sweeping Time, enable the skill in the character talent page.",
        "You can compare the difference between equipped artifacts and generated builds.",
        "Rainbow builds can sometimes be \"optimal\". Good substat combinations can sometimes surpass set effects.",
        "The more complex the formula, the longer the generation time.",]}
    ><InfoDisplay /></InfoComponent>
    {characterKey && selectedBuild && <BuildModal teamData={selectedBuild} characterKey={characterKey} onClose={closeBuildModal} />}
    {noCharacter && <Alert severity="error" variant="filled"> Opps! It looks like you haven't added a character to GO yet! You should go to the <Link component={RouterLink} to="/character">Characters</Link> page and add some!</Alert>}
    {noArtifact && <Alert severity="warning" variant="filled"> Opps! It looks like you haven't added any artifacts to GO yet! You should go to the <Link component={RouterLink} to="/artifact">Artifacts</Link> page and add some!</Alert>}
    {/* Build Generator Editor */}
    {!dataContext && <CardDark>
      <CardContent sx={{ py: 1 }}>
        <Typography variant="h6">Build Generator</Typography>
      </CardContent>
      <Divider />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <CardLight>
          <CardContent>
            <CharacterDropdownButton fullWidth value={characterKey} onChange={selectCharacter} disabled={generatingBuilds} />
          </CardContent>
        </CardLight>
      </CardContent>
    </CardDark>}
    {dataContext && <DataContext.Provider value={dataContext}>
      <CardDark>
        <CardContent sx={{ py: 1 }}>
          <Typography variant="h6">Build Generator</Typography>
        </CardContent>
        <Divider />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Grid container spacing={1} >
            {/* Left half */}
            <Grid item xs={12} md={6} lg={5} display="flex" flexDirection="column" gap={1}>
              <CardLight>
                <CardContent>
                  <CharacterDropdownButton fullWidth value={characterKey} onChange={selectCharacter} disabled={generatingBuilds} />
                </CardContent>
              </CardLight>
              {/* character card */}
              <Box><CharacterCard characterKey={characterKey} onClick={generatingBuilds ? undefined : setCharacter} /></Box>

              <BonusStatsCard />
              <TeamBuffCard />
              {/* Enemy Editor */}
              <EnemyEditorCard />
              {/*Minimum Final Stat Filter */}
              <StatFilterCard statFilters={statFilters} setStatFilters={sFs => buildSettingsDispatch({ statFilters: sFs })} disabled={generatingBuilds} />
              {/* Hit mode options */}
              <HitModeCard disabled={generatingBuilds} />
            </Grid>

            {/* Right half */}
            <Grid item xs={12} md={6} lg={7} display="flex" flexDirection="column" gap={1}>
              <ArtifactConditionalCard disabled={generatingBuilds} />

              {/* Artifact set pickers */}
              {setFilters.map((setFilter, index) => (index <= setFilters.filter(s => s.key).length) && <ArtifactSetPicker key={index} index={index} setFilters={setFilters}
                disabled={generatingBuilds} onChange={(index, key, num) => buildSettingsDispatch({ type: 'setFilter', index, key, num })} />)}

              {/* use equipped/excluded */}
              {characterKey && <CardLight><CardContent>
                <Grid container spacing={1}>
                  <Grid item flexGrow={1}>
                    <Button fullWidth onClick={() => buildSettingsDispatch({ useEquippedArts: !useEquippedArts })} disabled={generatingBuilds} startIcon={useEquippedArts ? <CheckBox /> : <CheckBoxOutlineBlank />}>
                      Use Equipped Artifacts
                    </Button>
                  </Grid>
                  <Grid item flexGrow={1}>
                    <Button fullWidth onClick={() => buildSettingsDispatch({ useExcludedArts: !useExcludedArts })} disabled={generatingBuilds} startIcon={useExcludedArts ? <CheckBox /> : <CheckBoxOutlineBlank />}>
                      Use Excluded Artifacts
                    </Button>
                  </Grid>
                </Grid>
              </CardContent></CardLight>}

              { /* Level Filter */}
              {characterKey && <CardLight>
                <CardContent sx={{ py: 1 }}>
                  Artifact Level Filter
                </CardContent>
                <Divider />
                <CardContent>
                  <ArtifactLevelSlider levelLow={levelLow} levelHigh={levelHigh} dark
                    setLow={levelLow => buildSettingsDispatch({ levelLow })}
                    setHigh={levelHigh => buildSettingsDispatch({ levelHigh })}
                    setBoth={(levelLow, levelHigh) => buildSettingsDispatch({ levelLow, levelHigh })}
                    disabled={generatingBuilds}
                  />
                </CardContent>
              </CardLight>}
              {/* main stat selector */}
              {characterKey && <MainStatSelectionCard
                mainStatAssumptionLevel={mainStatAssumptionLevel}
                mainStatKeys={mainStatKeys}
                onChangeMainStatKey={(slotKey, mainStatKey = undefined) => {
                  if (mainStatKey === undefined)
                    buildSettingsDispatch({ type: "mainStatKeyReset", slotKey })
                  else
                    buildSettingsDispatch({ type: "mainStatKey", slotKey, mainStatKey })
                }}
                onChangeAssLevel={mainStatAssumptionLevel => buildSettingsDispatch({ mainStatAssumptionLevel })}
                disabled={generatingBuilds}
              />}
            </Grid>
          </Grid>
          {/* Footer */}
          <Grid container spacing={1}>
            <Grid item flexGrow={1} >
              <ButtonGroup>
                <Button
                  disabled={!characterKey || generatingBuilds || !optimizationTarget || !totBuildNumber || !objPathValue(data?.getDisplay(), optimizationTarget)}
                  color={(characterKey && totBuildNumber <= warningBuildNumber) ? "success" : "warning"}
                  onClick={generateBuilds}
                  startIcon={<FontAwesomeIcon icon={faCalculator} />}
                >Generate</Button>
                {/* <Tooltip title={<Typography></Typography>} placement="top" arrow> */}
                <DropdownButton disabled={generatingBuilds || !characterKey}
                  title={<span><b>{maxBuildsToShow}</b> {maxBuildsToShow === 1 ? "Build" : "Builds"}</span>}>
                  <MenuItem>
                    <Typography variant="caption" color="info.main">
                      Decreasing the number of generated build will decrease build calculation time for large number of builds.
                    </Typography>
                  </MenuItem>
                  <Divider />
                  {maxBuildsToShowList.map(v => <MenuItem key={v}
                    onClick={() => buildSettingsDispatch({ maxBuildsToShow: v })}>{v} {v === 1 ? "Build" : "Builds"}</MenuItem>)}
                </DropdownButton>
                {/* </Tooltip> */}
                <Button
                  disabled={!generatingBuilds}
                  color="error"
                  onClick={() => cancelToken.current()}
                  startIcon={<Close />}
                >Cancel</Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <span>Optimization Target: </span>
              {<OptimizationTargetSelector
                optimizationTarget={optimizationTarget}
                setTarget={target => buildSettingsDispatch({ optimizationTarget: target })}
                disabled={!!generatingBuilds}
              />}
            </Grid>
          </Grid>

          {!!characterKey && <Box >
            <BuildAlert {...{ totBuildNumber, generatingBuilds, generationSkipped, generationProgress, generationDuration, characterName, maxBuildsToShow }} />
          </Box>}
          {tcMode && <Box >
            <ChartCard disabled={generatingBuilds} chartData={chartData} plotBase={plotBase} setPlotBase={setPlotBase} />
          </Box>}
        </CardContent>
      </CardDark>
      <CardDark>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" >
            <Typography>
              {teamDataBuilds ? <span>Showing <strong>{teamDataBuilds.length}</strong> Builds generated for {characterName}. {!!buildDate && <span>Build generated on: <strong>{(new Date(buildDate)).toLocaleString()}</strong></span>}</span>
                : <span>Select a character to generate builds.</span>}
            </Typography>
            <SolidToggleButtonGroup exclusive value={compareData} onChange={(e, v) => characterDispatch({ compareData: v })} size="small">
              <ToggleButton value={false} disabled={!compareData}>
                <small>Show New artifact Stats</small>
              </ToggleButton>
              <ToggleButton value={true} disabled={compareData}>
                <small>Compare against equipped artifacts</small>
              </ToggleButton>
            </SolidToggleButtonGroup>
          </Box>
        </CardContent>
      </CardDark>
      <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={600} />}>
        {/* Build List */}
        {teamDataBuilds?.map((teamData, index) => teamData && <DataContext.Provider key={index} value={{ ...dataContext, data: teamData[characterKey].target, teamData, oldData: data }}>
          <ArtifactBuildDisplayItem index={index} onClick={() => setmodalBuildIndex(index)} compareBuild={compareData} disabled={!!generatingBuilds} />
        </DataContext.Provider>
        )}
      </Suspense>
    </DataContext.Provider>}
  </Box>
}

function BuildModal({ teamData, characterKey, onClose }: { teamData: TeamData, characterKey: CharacterKey, onClose: () => void }) {
  return <ModalWrapper open={!!teamData} onClose={onClose} containerProps={{ maxWidth: "xl" }}>
    <CharacterDisplayCard
      characterKey={characterKey}
      newteamData={teamData}
      onClose={onClose}
      footer={<CloseButton large onClick={onClose} />} />
  </ModalWrapper>
}
