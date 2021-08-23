import * as React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'




const MenuPopupState = (props) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  return (
    <div>
      <MoreVertIcon variant="contained" {...bindTrigger(popupState)}  aria-controls="fade-menu" aria-haspopup="true" />
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>
          <span onClick={props.functiontopass.bind(this, props.id,props.postindex)}>{props.labeltopass}</span>
        </MenuItem>
        
        <MenuItem onClick={popupState.close}>
          <span><strong>CANCEL</strong></span>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MenuPopupState