import Tippy from "@tippyjs/react/headless";

interface Tippys {
  children: JSX.Element;
  title: string;
}
const TippySocial = ({ children, title }: Tippys) => {
  return (
    <>
      <Tippy
        interactive
        hideOnClick={false}
        offset={[0, 0]}
        placement="top-end"
        render={(attrs) => (
          <div className="" {...attrs}>
            <div className="bg-slate-600 text-white px-2">
              <p>{title}</p>
            </div>
          </div>
        )}
      >
        {children}
      </Tippy>
    </>
  );
};

export default TippySocial;
