import Matter from "matter-js";
import { View, StatusBar } from "react-native";

const BirdRenderer = (props) => {
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
				borderRadius: 20,
				backgroundColor: color,
			}}
		/>
	);
};

export default (world, size, color, pos) => {
	const Bird = Matter.Bodies.rectangle(pos.x, pos.y, size.height, size.width, {
		label: "Bird",
	});

	Matter.World.add(world, Bird);

	return {
		body: Bird,
		color,
		pos,
		renderer: <BirdRenderer />,
	};
};
