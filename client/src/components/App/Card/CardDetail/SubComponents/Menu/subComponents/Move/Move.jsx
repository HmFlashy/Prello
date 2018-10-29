import React from 'react';
import './Move.css'
import { Icon, Modal, Header, Button, Dropdown } from 'semantic-ui-react'
import Avatar from 'react-avatar';

export default (props) => (
    <Modal open={props.isOpened}>
        <Header icon='right arrow' content='Where to' />
        <Modal.Content>
            {
                props.info && props.boards && props.info.lists
                    ?
                    <div>
                        <div>
                            <label>Board</label>
                            <Dropdown text={props.currentBoard.name} fluid selection>
                                <Dropdown.Menu>
                                    {props.boards.map(board => <Dropdown.Item key={board._id} onClick={() => props.onBoardChange(board._id)}>{board.name}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div>
                            <label>List</label>
                            <Dropdown text={props.currentList.name} fluid selection>
                                <Dropdown.Menu>
                                    {props.info.lists.map(list => <Dropdown.Item key={list._id} onClick={() => props.onListChange(list)}>{list.name}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div>
                            <label>Position</label>
                            <Dropdown text={props.currentPos.userPos} fluid selection>
                                <Dropdown.Menu>
                                    {props.currentList.possiblePos.map(pos => <Dropdown.Item onClick={() => props.onPosChange(pos)}>{pos.userPos}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    : ""
            }
        </Modal.Content>
        <Modal.Actions>
            <Button color='red' onClick={props.onCancel}>
                <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' onClick={props.onValidate}>
                <Icon name='checkmark' /> Validate
            </Button>
        </Modal.Actions>
    </Modal>
)