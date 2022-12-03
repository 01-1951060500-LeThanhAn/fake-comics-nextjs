import Tippy from "@tippyjs/react/headless";
import { logOut } from "../../config/firebase";

import useStore from "../../zustand";

interface Tippys {
  children: JSX.Element;
}
const TippyMenu = ({ children }: Tippys) => {
  const { user } = useStore();
  return (
    <>
      <Tippy
        interactive
        hideOnClick={false}
        offset={[12, 4]}
        placement="bottom-end"
        render={(attrs) => (
          <div className="bg-white p-3" {...attrs}>
            <div className="email">
              <p>{user.displayName}</p>
              <button onClick={() => logOut()}>Đăng xuất</button>
            </div>
          </div>
        )}
      >
        {children}
      </Tippy>
    </>
  );
};

export default TippyMenu;
