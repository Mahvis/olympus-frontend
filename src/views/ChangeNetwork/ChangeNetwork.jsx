import "./changenetwork.scss";

import { Backdrop, Fade, Grid, Link, Paper, SvgIcon, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import { useHistory } from "react-router-dom";

import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
import { NETWORKS, USER_SELECTABLE_NETWORKS } from "../../constants";
import { switchNetwork } from "../../helpers/NetworkHelper";
import useEscape from "../../hooks/useEscape";
import { useWeb3Context } from "../../hooks/web3Context";

function ChangeNetwork() {
  const { provider, networkName } = useWeb3Context();
  const history = useHistory();

  const handleClose = () => {
    history.goBack();
  };

  const handleSwitchChain = id => {
    return async () => {
      await switchNetwork({ provider: provider, networkId: id });
      handleClose();
    };
  };

  useEscape(() => {
    handleClose();
  });

  return (
    <Fade in={true} mountOnEnter unmountOnExit>
      <Grid container id="change-network-view">
        <Backdrop open={true}>
          <Fade in={true}>
            <Paper className="ohm-card ohm-modal">
              <Grid container className="grid-container">
                <Grid className="grid-header">
                  <Grid>
                    <Link onClick={handleClose}>
                      <SvgIcon color="primary" component={XIcon} />
                    </Link>
                  </Grid>
                  <Grid className="grid-header-title" xs={10}>
                    <Typography variant="h5">Select a Network</Typography>
                  </Grid>
                  <Grid />
                </Grid>

                <Grid className="grid-message">
                  {networkName !== "Unsupported Chain!" ? (
                    <Typography className="grid-message-typography">
                      You are currently connected to the&nbsp;
                      <Typography className="chain-highlight">{networkName}</Typography>
                      &nbsp;network.
                    </Typography>
                  ) : (
                    <Typography className="grid-message-typography">
                      You are connected to an unsupported network. Please select a network from the list below.
                    </Typography>
                  )}
                </Grid>

                <Grid className="grid-buttons">
                  {USER_SELECTABLE_NETWORKS.map(network => {
                    return (
                      <Grid
                        key={network}
                        className={networkName === NETWORKS[network].chainName ? "grid-button current" : "grid-button"}
                      >
                        <Button onClick={handleSwitchChain(network)}>
                          <Grid className="grid-button-content">
                            <img
                              className="grid-button-icon"
                              src={NETWORKS[network].image}
                              alt={NETWORKS[network].imageAltText}
                            />
                          </Grid>
                          <Grid className="grid-button-content right">
                            <Typography className={networkName === NETWORKS[network].chainName ? "current" : ""}>
                              {NETWORKS[network].chainName}
                            </Typography>
                          </Grid>
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        </Backdrop>
      </Grid>
    </Fade>
  );
}

export default ChangeNetwork;
