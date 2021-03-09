import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Button, Paper, Tooltip, Container, CircularProgress  } from '@material-ui/core';

import { ConvertBalanceToBZZ } from '../../utils/common';
import EthereumAddress from '../../components/EthereumAddress';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

interface ChequeEvent {
    beneficiary: string,
    chequebook: string,
    payout: number,
}

interface PeerCheque {
    lastreceived?: ChequeEvent,
    lastsent?: ChequeEvent,
    peer: string,
}

interface PeerCheques {
    lastcheques: Array<PeerCheque>
}

interface IProps {
    peerCheques: PeerCheques,
    loading?: boolean,
}
  
function ChequebookTable(props: IProps) {
    const classes = useStyles();

    return (
        <div>
            {props.loading ? 
            <Container style={{textAlign:'center', padding:'50px'}}>
                <CircularProgress />
            </Container>
            :
             <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Peer</TableCell>
                        <TableCell>Last Received</TableCell>
                        <TableCell>Last Sent</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.peerCheques.lastcheques.map((peerCheque: PeerCheque, idx: number) => (
                        <TableRow key={peerCheque.peer}>
                        <TableCell>
                            {peerCheque.peer}
                        </TableCell>
                        <TableCell>
                            <p style={{marginBottom: '0px'}}>{peerCheque.lastreceived?.payout ? ConvertBalanceToBZZ(peerCheque.lastreceived?.payout) : '-'}</p>
                            <p style={{marginBottom: '0px'}}>
                                <small>{peerCheque.lastreceived ?
                                <EthereumAddress
                                hideBlockie
                                address={peerCheque.lastreceived.beneficiary}
                                /> : null}
                                </small>
                            </p>
                        </TableCell>
                        <TableCell>
                            <p  style={{marginBottom: '0px'}}>{peerCheque.lastsent?.payout ? ConvertBalanceToBZZ(peerCheque.lastsent?.payout) : '-'}</p>
                            <p style={{marginBottom: '0px'}}>
                                <small>{peerCheque.lastsent ?
                                <EthereumAddress
                                hideBlockie
                                address={peerCheque.lastsent.beneficiary}
                                /> : null}
                                </small>
                            </p>
                        </TableCell>
                        <TableCell align="right">
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </div>
    )
}

export default ChequebookTable;
