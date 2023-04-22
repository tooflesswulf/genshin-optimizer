import type { QueryBuild} from './artifactQuery';
import { querySetup } from './artifactQuery'
import { evalArtifact } from './evalArtifact'
import { formula, artifacts } from './testData'

test('debug', () => {
  // top 3 builds (in order 1st, 2nd, 3rd)
  const bestBuilds: string[][] = [
    [
      'artifact_500',
      'artifact_630',
      'artifact_6',
      'artifact_234',
      'artifact_824',
    ],
    [
      'artifact_500',
      'artifact_512',
      'artifact_234',
      'artifact_630',
      'artifact_6',
    ],
    [
      'artifact_500',
      'artifact_45',
      'artifact_234',
      'artifact_6',
      'artifact_985',
    ],
  ]

  const curBuild = Object.fromEntries(
    artifacts
      .filter((art) => bestBuilds[0].includes(art.id))
      .map((art) => [art.slot, art])
  ) as any as QueryBuild
  const query = querySetup(formula, [], curBuild)

  console.log('Evaluate ', artifacts[3])
  const result = evalArtifact(query, artifacts[3], true, true)
  console.log('prob. upgrade: ', { p: result.prob })
})
