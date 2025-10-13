import React from 'react';
import type { Agent, PartialAgent } from '../models/Agent';
import { Box, Card, CardContent, List, Stack, Typography, useTheme } from '@mui/material'
import { Circle } from '@mui/icons-material';
import { formatLastSeen } from '../utils/datatime';
import { CustomChip } from '../components/CustomChip';

interface InfoComponentProps {
    label: string
    value: any
}

const InfoComponent: React.FC<InfoComponentProps> = ({ label, value }: InfoComponentProps) => {
    return (
        <Box>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Typography variant="body2" fontWeight="medium">{value}</Typography>
        </Box>
    )
}


function Header({ id, status }: PartialAgent) {
    console.log(status)
    const formattedId = id != undefined ? id.substring(0, 8) : null;
    const statusColor = status?.toString() == 'Alive' ? 'error' : 'success'
    return (
        <Stack direction='row' justifyContent='space-between'>
            <Typography variant="caption" color="text.secondary">#{formattedId} </Typography>
            <Circle color={statusColor} fontSize='small' />
        </Stack>
    )
}

function LeaftSide({ hostname, version, ip }: PartialAgent) {
    return (
        <Stack>
            <Typography
                variant="h5"
                fontWeight="extrabold"
                color='primary'
                sx={{
                    textTransform: 'uppercase',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'no wrap'
                }}
            >
                {hostname}
            </Typography>
            <Stack spacing={4} direction='row'>
                <Typography variant="body2" color="text.secondary">{ip}</Typography>
                <Typography variant="body2" color="text.secondary">{
                    version ? `${version}v` : 'unkown'}</Typography>
            </Stack>
        </Stack>
    )
}

function RightSide({ os, lastSeen }: PartialAgent) {
    let lastSeenAgo = lastSeen ? formatLastSeen(lastSeen) : 'unkonwn'
    return (
        <Stack
            direction="row"
            spacing={4}
            justifyContent={{ xs: 'flex-start', md: 'center' }}
            divider={<Box sx={{ height: '40px', width: '2px' }} />}
        >
            <InfoComponent label='OS' value={os} />
            <InfoComponent label='Last Seen' value={lastSeenAgo} />
        </Stack>
    )
}

const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => {
    const { id, hostname, ip, os, status, lastSeen, version, tags } = agent;
    const theme = useTheme();

    return (
        <Card
            elevation={4}
            sx={{
                borderRadius: theme.shape.borderRadius,
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: theme.shadows[8] },
            }}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Header id={id} status={status} />
                    <Stack spacing={4} direction='row' alignItems='flex-end' justifyContent='flex-start'>
                        <LeaftSide hostname={hostname} version={version} ip={ip} />
                        <RightSide os={os} lastSeen={lastSeen} />
                    </Stack>
                    {tags && tags.length > 0 && (
                        <Stack
                            direction="row" 
                            spacing={0.5}
                            justifyContent={{ xs: 'flex-start' }}
                            sx={{
                                overflowX: 'auto',
                                maxWidth: '100%',
                            }}
                        >
                            {tags.map((tag, index) => (
                                <CustomChip key={index} label={tag} />
                            ))}
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default AgentCard;