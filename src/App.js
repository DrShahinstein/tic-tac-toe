import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Game from "./components/game";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBoard: false,
      isModalVisible: false,
      theme: "Light",
      user: undefined,
      gameMode: undefined,
    };
  }

  saveSettings = () => {
    this.settings = {
      gameMode: this.state.gameMode,
      user: this.state.user,
    };
    if (this.settings.user && this.settings.gameMode) {
      this.setState((prevState) => ({ showBoard: !prevState.showBoard }));
    } else {
      this.setState((prevState) => ({
        isModalVisible: !prevState.isModalVisible,
      }));
    }
  };

  themeSwitcher = () => {
    if (this.state.theme === "Light") {
      document.body.style.backgroundColor = "#222222";
      document.getElementById("board").style.color = "white";

      this.setState({ theme: "Dark" });
    } else {
      document.body.style.backgroundColor = "White";
      document.getElementById("board").style.color = "#222222";

      this.setState({ theme: "Light" });
    }
  };

  closeModal = () => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  };

  setGameMode = (gameMode) => {
    this.setState(() => ({ gameMode: gameMode }));
  };

  setPickOfUser = (pick) => {
    this.setState(() => ({ user: pick }));
  };

  render() {
    if (this.state.showBoard) {
      return (
        <>
          <Button className="theme-switcher" onClick={this.themeSwitcher}>
            Switch to {this.state.theme === "Light" ? "Dark" : "Light"} Theme
          </Button>
          <Game settings={this.settings} />
        </>
      );
    }
    return (
      <>
        <Modal show={this.state.isModalVisible}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              You should set your settings before playing the game <br />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.closeModal}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <div id="settings-gui">
          <div>
            <h2>Select Game Mode</h2>
            <div className="option" onClick={() => this.setGameMode("PvP")}>
              Player vs Player
            </div>
            <div className="option" onClick={() => this.setGameMode("PvC")}>
              Player vs Computer
            </div>
          </div>
          <div className="mt-5">
            <h2>Select Your Side</h2>
            <div className="option" onClick={() => this.setPickOfUser("X")}>
              <b>X</b>
            </div>
            <div className="option" onClick={() => this.setPickOfUser("O")}>
              <b>O</b>
            </div>
          </div>
          <br />
          <div>Game Mode: {this.state.gameMode}</div>
          <div>User's Pick: {this.state.user}</div>
          <br /> <br /> <br />
          <Button onClick={this.saveSettings}>OK</Button>
        </div>
      </>
    );
  }
}

export default App;
