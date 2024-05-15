import React, { useTransition } from "react";

const TabsButton = ({ children, isActive, onClick }) => {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>children</b>;
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button
      onClick={(e) => {
        startTransition(() => {
          onClick(e);
        });
      }}
    >
      {children}
    </button>
  );
};

export default TabsButton;

// <TabButton
// isActive={tab === 'about'}
// onClick={() => setTab('about')}
// >
// About
// </TabButton>
