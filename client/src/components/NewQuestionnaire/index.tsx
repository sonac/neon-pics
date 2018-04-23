import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BasicActionCreator, IdActionCreator, PicInputActionCreator, NewQuestNameActionCreator } from 'state/types';
import { PicInput, State as ComparisonState } from 'state/comparison/types';
import { addNewPictureLink, removePicutreLink, updatePicLink, updateNewQuestName, postNewQuestionnaire } from 'state/comparison/actions';

const styles = require('./styles.css');

interface Data {
  picInputs: Array<PicInput>,
  picInpName: string
}

interface Actions {
  addNewPictureLink: BasicActionCreator;
  removePicutreLink: IdActionCreator;
  updatePicLink: PicInputActionCreator;
  updateNewQuestName: NewQuestNameActionCreator;
  postNewQuestionnaire: BasicActionCreator;
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class NewQuestionnaire extends Component<Props, State> {

  handleChange = (e, inp, picIdx) => {
    let picInput: PicInput = this.props.data.picInputs[picIdx];
    if (inp === "name") {
      this.props.actions.updateNewQuestName(e.target.value);
    }
    else if (inp === "link") {
      picInput = {url: e.target.value}
      this.props.actions.updatePicLink(picIdx, picInput)
    }

  }

  handleRemoveLink = (idx) => () => {
    const picInps =this.props.data.picInputs;
    this.props.actions.removePicutreLink(idx);
  }

  handleAddLink = () => {
    this.props.actions.addNewPictureLink();
  }

  handleCreateQuest = () => {
    this.props.actions.postNewQuestionnaire();
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.actions.postNewQuestionnaire();
    }
  } 

  render() {
    return (
      <div className={styles.wrapper}>
        <h2>Create new questionnaire</h2>
        <div className={styles.inputs}>
          <input type="text" 
                placeholder="Enter the name of new questionnaire"
                value={this.props.data.picInpName}
                onChange={(e) => {this.handleChange(e, "name", 0)}} /> 
          {this.props.data.picInputs.map((pic, idx) => (
            <div className={styles.picInput} key={idx}>
              <input type="text" 
                    placeholder={`Picutre #${idx + 1} link`}
                    value={pic.url}
                    onChange={(e) => {this.handleChange(e, "link", idx)}} 
                    onKeyPress={(e) => this.handleEnter(e)}/> 
              <Button color ="alert" size="large" onClick={this.handleRemoveLink(idx)} hollow>-</Button>
            </div>
          ))}
          <div className={styles.buttons}>
            <Button size="large" onClick={this.handleAddLink} hollow>Add new picture input</Button>
            <Link to="/">  <Button color="success" 
                              size="large" 
                              onClick={this.handleCreateQuest} 
                              hollow>Create new questionnaire</Button>  
            </Link>
          </div>      
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  picInputs: state.comparison.picInputs,
  picInpName: state.comparison.picInpName
});

const mapDispatchToProps = {
  addNewPictureLink,
  removePicutreLink,
  updatePicLink,
  updateNewQuestName,
  postNewQuestionnaire
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewQuestionnaire);