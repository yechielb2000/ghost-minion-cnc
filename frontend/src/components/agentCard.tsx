import React from 'react';
import type { Agent, PartialAgent } from '../models/Agent';
import { Box, Card, CardContent, Stack, Typography, useTheme } from '@mui/material'
import { Circle } from '@mui/icons-material';
import { formatLastSeen } from '../utils/datatime';
import { CustomChip } from '../components/CustomChip';
import ScrollableStack from './ScrollableStack';

interface InfoComponentProps {
    label: string
    value: any
}

const InfoComponent: React.FC<InfoComponentProps> = ({ label, value }: InfoComponentProps) => {
    return (
        <Stack>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Typography variant="body2" fontWeight="medium">{value}</Typography>
        </Stack>
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

function AgentInfo({ hostname, version, ip, os, lastSeen }: PartialAgent) {
    let lastSeenAgo = lastSeen ? formatLastSeen(lastSeen) : 'unkonwn'
    return (
        <Stack spacing={4} direction='row' alignItems='flex-end' justifyContent='flex-start'>
            <Stack width='25%'>
                <Typography
                    variant="h5"
                    fontWeight="extrabold"
                    color='primary'
                    sx={{
                        textTransform: 'uppercase',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'no wrap'
                    }}>
                    {hostname}
                </Typography>
                <Stack spacing={4} direction='row'>
                    <Typography variant="body2" color="text.secondary">{ip}</Typography>
                    <Typography variant="body2" color="text.secondary">{
                        version ? `${version}v` : 'unkown'}</Typography>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                spacing={4}
                justifyContent={{ xs: 'flex-start', md: 'center' }}
                divider={<Box sx={{ height: '50px', width: '25px' }} />}
            >
                <InfoComponent label='Last Seen' value={lastSeenAgo} />
                <InfoComponent label='OS' value={os} />
            </Stack>
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
                    <AgentInfo hostname={hostname} version={version} ip={ip} os={os} lastSeen={lastSeen} />
                </Stack>
                {tags && tags.length > 0 && (
                    <ScrollableStack direction='row' spacing={0.5}>
                        {tags.map((tag, index) => (
                            <CustomChip key={index} label={tag} />
                        ))}
                    </ScrollableStack>
                )}
            </CardContent>
        </Card >
    );
}

export default AgentCard;