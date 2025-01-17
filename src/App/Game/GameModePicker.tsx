import React from 'react';
import AndroidIcon from '@material-ui/icons/Android';
import GroupIcon from '@material-ui/icons/Group';
import WifiIcon from '@material-ui/icons/Wifi';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { IGameDef } from '../../games';

interface IGameModePickerProps {
  gameDef: IGameDef;
}

interface IGameModePickerState {
  extraInfo: { [mode: string]: number };
}

export interface IGameModeInfo {
  mode: GameMode;
  extraInfo?: IGameModeExtraInfo;
}

interface IGameModeExtraInfo {
  type: string;
}

export interface IGameModeExtraInfoSlider extends IGameModeExtraInfo {
  type: 'slider';
  min: number;
  max: number;
}

export interface IGameModeExtraInfoDropdown extends IGameModeExtraInfo {
  type: 'dropdown';
  options: string[];
}

export enum GameMode {
  AI = 'AI',
  OnlineFriend = 'online',
  LocalFriend = 'local',
}

export class GameModePicker extends React.Component<IGameModePickerProps, IGameModePickerState> {
  _getLink = (to: string) =>
    React.forwardRef((props: any, ref: any) => {
      return <Link to={to} rel="nofollow" {...props} ref={ref} />;
    });

  constructor(props: IGameModePickerProps) {
    super(props);
    this.state = { extraInfo: { online: this.props.gameDef.minPlayers } };
  }

  render() {
    const modes = [];
    for (const mode of this.props.gameDef.modes) {
      modes.push(this._getCard(mode));
    }
    return (
      <div>
        <Typography variant="subtitle1" style={{ marginBottom: '16px' }}>
          Choose game mode
        </Typography>
        {modes}
      </div>
    );
  }

  _getCard(info: IGameModeInfo) {
    let title;
    let description;
    let icon;
    switch (info.mode) {
      case GameMode.AI:
        title = 'Computer (AI)';
        description = 'Play against the computer in your browser.';
        icon = <AndroidIcon />;
        break;
      case GameMode.LocalFriend:
        title = 'Local Friend';
        description = 'Share your device and play against a friend locally.';
        icon = <GroupIcon />;
        break;
      case GameMode.OnlineFriend:
        title = 'Online Friend';
        description = 'Share a link and play against a friend online.';
        icon = <WifiIcon />;
        break;
    }
    const extraInfo = this._getExtraInfo(info);
    return (
      <Card key={title} style={{ marginBottom: '16px' }}>
        <CardHeader avatar={<Avatar aria-label={title}>{icon}</Avatar>} title={title} />
        <CardContent>
          <Typography component="p">{description}</Typography>
        </CardContent>
        <CardActions>
          {extraInfo}
          <Button
            data-testid="playButton"
            component={this._getLink(this._getUrl(info))}
            variant="contained"
            color="primary"
            style={{ marginLeft: 'auto' }}
          >
            Play
          </Button>
        </CardActions>
      </Card>
    );
  }

  _getExtraInfoValue(info: IGameModeInfo): number {
    return (this.state.extraInfo as any)[info.mode] || 1;
  }

  _getExtraInfo(info: IGameModeInfo) {
    if (info.mode == GameMode.OnlineFriend) {
      if (this.props.gameDef.minPlayers < this.props.gameDef.maxPlayers) {
        return this._getExtraInfoNumPlayers(info, this.props.gameDef.minPlayers, this.props.gameDef.maxPlayers);
      }
    }
    if (info.extraInfo) {
      const extraInfo = info.extraInfo;
      if (extraInfo.type === 'slider') {
        const slider = extraInfo as IGameModeExtraInfoSlider;
        return this._getExtraInfoSlider(info, slider);
      } else if (extraInfo.type === 'dropdown') {
        const dropdown = extraInfo as IGameModeExtraInfoDropdown;
        return this._getExtraInfoDropdown(info, dropdown);
      }
    }
    return null;
  }

  _getExtraInfoNumPlayers(info: IGameModeInfo, minPlayers: number, maxPlayers: number) {
    const options = [];
    for (let i = minPlayers; i <= maxPlayers; i++) {
      options.push(
        <MenuItem value={i} key={i}>
          {i} Players
        </MenuItem>,
      );
    }
    return (
      <div style={{ marginBottom: '8px' }}>
        <PersonIcon style={{ position: 'relative', top: '8px', padding: '0 8px' }} />
        <Select value={this._getExtraInfoValue(info)} onChange={this._handleNumPlayersSelect}>
          {options}
        </Select>
      </div>
    );
  }

  _handleNumPlayersSelect = (event: any) => {
    const newState: IGameModePickerState = {
      ...this.state,
      extraInfo: {
        ...this.state.extraInfo,
      },
    };
    newState.extraInfo[GameMode.OnlineFriend] = event.target.value;
    this.setState(newState);
  };

  _getExtraInfoSlider(info: IGameModeInfo, slider: IGameModeExtraInfoSlider) {
    const value = this._getExtraInfoValue(info);
    return (
      <div style={{ marginBottom: '18px', width: '80%' }}>
        <Typography id="label" style={{ marginBottom: '8px' }}>
          Difficulty {value}/{slider.max}
        </Typography>
        <Slider
          value={value}
          min={slider.min}
          max={slider.max}
          step={1}
          onChange={this._handleSliderChange(info.mode)}
        />
      </div>
    );
  }

  _handleSliderChange = (mode: GameMode) => (event: any, value: number) => {
    const newState: IGameModePickerState = {
      ...this.state,
      extraInfo: {
        ...this.state.extraInfo,
      },
    };
    newState.extraInfo[mode] = value;
    this.setState(newState);
  };

  _getExtraInfoDropdown(info: IGameModeInfo, dropdown: IGameModeExtraInfoDropdown) {
    const list: JSX.Element[] = dropdown.options.map((option, idx) => {
      idx++;
      return (
        <MenuItem
          onClick={this._handleClickSelection(info.mode, idx)}
          key={option}
          value={option}
          selected={this._getExtraInfoValue(info) === idx}
        >
          {option}
        </MenuItem>
      );
    });
    return (
      <div>
        <MenuList
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex',
          }}
        >
          {list}
        </MenuList>
      </div>
    );
  }

  _handleClickSelection = (mode: GameMode, value: any) => () => {
    const newState: IGameModePickerState = {
      ...this.state,
      extraInfo: {
        ...this.state.extraInfo,
      },
    };
    newState.extraInfo[mode] = value;
    this.setState(newState);
  };

  _getUrl(info: IGameModeInfo) {
    const mode = info.mode;
    switch (mode) {
      case GameMode.AI:
        if (info.extraInfo) {
          return `/g/${this.props.gameDef.code}/AI/${this._getExtraInfoValue(info)}`;
        } else {
          return `/g/${this.props.gameDef.code}/AI`;
        }
      case GameMode.LocalFriend:
        return `/g/${this.props.gameDef.code}/local`;
      case GameMode.OnlineFriend:
        return `/room/new/${this.props.gameDef.code}/${this._getExtraInfoValue(info)}`;
    }
  }
}
