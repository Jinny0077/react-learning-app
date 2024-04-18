interface IProps {
  width?: number;
  height?: number;
}

function Spacer({ width, height }: IProps) {
  return <div style={{ width: width || 0, height: height || 0 }} />;
}

export default Spacer;
