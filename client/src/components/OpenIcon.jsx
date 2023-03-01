import { useContext } from "react"
import { ChatContext } from "./ChatContext"

import { FiSettings } from "react-icons/fi"

const OpenIcon = ({ positionIcon, viewport, fontSize }) => {
    const {open, setOpen} = useContext(ChatContext)
    return(
        <div className={viewport}>
        {!open && (
          <FiSettings
            fontSize={fontSize} 
            className={`${positionIcon}`}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

    )
}

export default OpenIcon;