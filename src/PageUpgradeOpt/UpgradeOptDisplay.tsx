import { Alert, Box, CardContent, Divider, Link, Typography } from '@mui/material';
import { useContext, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CardDark from '../Components/Card/CardDark';
import CardLight from '../Components/Card/CardLight';
import { DatabaseContext } from '../Database/Database';
import CharSelectDropdown from '../PageCharacter/CharacterDisplay/CharSelectDropdown';

export default function UpgradeOptDisplay() {
  const { database } = useContext(DatabaseContext)

  const noCharacter = useMemo(() => !database.chars.keys.length, [database])
  const noArtifact = useMemo(() => !database.arts.keys.length, [database])

;  return <Box display="flex" flexDirection="column" gap={1} sx={{ my: 1 }}>
    {noCharacter && <Alert severity="error" variant="filled"> Opps! It looks like you haven't added a character to GO yet! You should go to the <Link component={RouterLink} to="/character">Characters</Link> page and add some!</Alert>}
    {noArtifact && <Alert severity="warning" variant="filled"> Opps! It looks like you haven't added any artifacts to GO yet! You should go to the <Link component={RouterLink} to="/artifact">Artifacts</Link> page and add some!</Alert>}
    {/* Build Generator Editor */}
    {<CardDark>
      <CardContent sx={{ py: 1 }}>
        <Typography variant="h6">Build Generator</Typography>
      </CardContent>
      <Divider />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <CardLight>
          <CardContent>
            <CharSelectDropdown />
            {/* <CharacterDropdownButton fullWidth value={characterKey} onChange={selectCharacter} /> */}
          </CardContent>
        </CardLight>
      </CardContent>
    </CardDark>}
  </Box>
}
