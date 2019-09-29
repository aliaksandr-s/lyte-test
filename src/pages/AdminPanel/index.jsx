import React, { Component } from 'react';
import { Card, Dropdown, Input, Grid, Button, Icon, Transition } from 'semantic-ui-react';

import { inject, observer } from 'mobx-react';

const inputStyles = {
  width: '50%',
}

const buttonGroupStyles = {
  width: '45%',
}

const editColumnStyles = {
  display: 'flex',
  justifyContent: 'space-between',
}

const AdminPanel = ({
  isLoading,
  categories,
  categorieToEdit,
  handleSelect,
  handleChange,
  handleUpdate,
  handleCancel,
  isUpdating,
  saveEditInputRef,
  isUpdated,
}) => (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>Edit Categories</Card.Header>
          <Card.Description>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Dropdown
                    loading={isLoading}
                    style={inputStyles}
                    placeholder='Select Category to edit'
                    search
                    selection
                    value=''
                    options={categories}
                    onChange={handleSelect}
                  />
                </Grid.Column>
              </Grid.Row>

              {categorieToEdit.value &&
                <Grid.Row>
                  <Grid.Column
                    style={editColumnStyles}
                  >
                    <Input
                      style={inputStyles}
                      placeholder='Edit...'
                      value={categorieToEdit.value}
                      onChange={handleChange}
                      autoFocus
                      ref={saveEditInputRef}
                    />
                    <Button.Group
                      style={buttonGroupStyles}
                    >
                      <Button
                        positive
                        disabled={!categorieToEdit.value}
                        onClick={handleUpdate}
                        loading={isUpdating}
                      >

                        {
                          !isUpdated &&
                          <span>Update</span>
                        }

                        {
                          isUpdated &&
                          <span>
                            <Icon name='thumbs up outline' />
                            Success
                           </span>
                        }

                      </Button>
                      <Button.Or />
                      <Button
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Button.Group>
                  </Grid.Column>

                </Grid.Row>
              }

            </Grid>
          </Card.Description>
        </Card.Content>
      </Card>

    </Card.Group>
  );

@inject('CategoriesStore')
@observer
class AdminPanelContainer extends Component {
  constructor(props) {
    super(props);

    this.editInput = undefined;
    this.state = {
      categorieToEdit: {
        id: undefined,
        value: '',
      }
    }
  }

  componentDidMount() {
    this.props.CategoriesStore.getCategories();
  }

  handleSelect = (e, data) => {
    // FIXME: When inmplicit selection happens by clicking outside of the dropdown
    // e.target is equal to input and not its child so id parameter isn't passed  
    this.setState({
      categorieToEdit: {
        id: e.target.id,
        value: data.value,
      }
    }, () => {
      this.editInput && this.editInput.focus();
    })
  }

  handleChange = (event) => {
    this.setState({
      categorieToEdit: {
        ...this.state.categorieToEdit,
        value: event.target.value
      }
    })
  };

  handleUpdate = () => {
    const { id, value } = this.state.categorieToEdit;
    this.props.CategoriesStore.updateCategorie(id, value)
  }

  cleanCategory = () => {
    this.setState({
      categorieToEdit: {
        id: '',
        value: '',
      }
    })
  }

  saveEditInputRef = (input) => { this.editInput = input; }

  render() {
    const {
      categories,
      isLoading,
      isUpdating,
      isUpdated,
    } = this.props.CategoriesStore

    return (
      <AdminPanel
        categories={categories}
        categorieToEdit={this.state.categorieToEdit}
        isLoading={isLoading}
        isUpdating={isUpdating}
        isUpdated={isUpdated}
        handleSelect={this.handleSelect}
        handleChange={this.handleChange}
        handleUpdate={this.handleUpdate}
        handleCancel={this.cleanCategory}
        saveEditInputRef={this.saveEditInputRef}
      />
    )
  }
}

export default AdminPanelContainer;