import Matter from "matter-js";
import { View, StatusBar } from "react-native";

const FloorRenderer = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const BodyPosX = props.body.position.x - width / 2;
  const BodyPosY = props.body.position.y - height / 2;

  const color = props.color;

  return (
    <View
      style={{
        position: "absolute",
        left: BodyPosX,
        top: BodyPosY,
        width: width,
        height: height,
        backgroundColor: color,
      }}
    />
  );
};

export default (world, size, color, pos) => {
  const Floor = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: "Floor",
    isStatic: true,
  });

  Matter.World.add(world, Floor);

  return {
    body: Floor,
    color,
    pos,
    renderer: <FloorRenderer />,
  };
};
