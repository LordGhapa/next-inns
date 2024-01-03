interface Props {
  isOpen: boolean;
}

export default function BackDrop({ isOpen }: Props) {
  return isOpen ? (
    <div className="fixed left-0 top-0 z-[60] h-screen w-screen bg-[rgba(0,0,0,0.8)]" />
  ) : (
    <></>
  );
}
