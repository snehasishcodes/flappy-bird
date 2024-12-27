import Matter from "matter-js";
import { View, StatusBar } from "react-native";

const ObstacleRenderer = (props) => {
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
        borderWidth: 1,
        borderColor: color,
        borderStyle: "solid",
        backgroundColor: color,
      }}
    />
  );
};

export default (world, label, color, size, pos) => {
  const Obstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label,
      isStatic: true,
    },
  );

  Matter.World.add(world, Obstacle);

  return {
    body: Obstacle,
    color,
    pos,
    renderer: <ObstacleRenderer />,
  };
};
