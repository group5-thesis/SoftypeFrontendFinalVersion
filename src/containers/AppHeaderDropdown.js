import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Modal } from "reusable";
import Avatar from "react-avatar";
const ProfilePage = React.lazy(() => import("modules/profile/Profilev1"));

const AppHeaderDropdown = (props) => {
  const { history } = props;
  const auth = useSelector((state) => {
    return state.appState.auth;
  });
  const modalRef = useRef(null);
  const showProfile = () => {
    modalRef.current.toggle();
  };
  const logout = () => {
    props.logout();
    history.push("/login");
  };
  const { user } = auth;

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      {auth.user && auth.already_logged && (
        <Modal
          ref={modalRef}
          {...{
            title: "Profile",
            size: "lg",
            cancelBtnTitle: "close",
            hidden: true,
          }}
        >
          <ProfilePage {...{
            auth, history, toggleModal: () => {
              modalRef.current.toggle();
            }
          }} />
        </Modal>
      )}
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <Avatar
            {...{
              name: `${user.firstname} ${user.lastname}`,
              className: "c-avatar-img",
              color: "orange",
              round: true,
              size: 35,
            }}
          />

          {/* <CImg
            src={res.avatar}
            className="c-avatar-img"
            alt="userlogo"
          /> */}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          onClick={() => {
            showProfile();
          }}
        >
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logout}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
