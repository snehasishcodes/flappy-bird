import Matter from "matter-js";
import Bird from "../components/Bird.js";
import Floor from "../components/Floor.js";
import Obstacle from "../components/Obstacle.js";
import { Dimensions } from "react-native";

import getPipePairSizePos from "../utils/getPipePairSizePos.js";

const windowH = Dimensions.get("window").height;
const windowW = Dimensions.get("window").width;

export default (restart) => {
	const engine = Matter.Engine.create({ enableSleeping: false });
	const world = engine.world;
	engine.gravity.y = 0.4;

	const pipePair1 = getPipePairSizePos();
	const pipePair2 = getPipePairSizePos(windowW * 0.9);
	// console.log(pipePairA)

	return {
		physics: { engine, world },
		Bird: Bird(world, { height: 40, width: 40 }, "green", { x: 50, y: 300 }),
		Floor: Floor(world, { height: 50, width: windowW }, "green", {
			x: windowW / 2,
			y: windowH,
		}),
		ObstacleTop1: Obstacle(
			world,
			"ObstacleTop1",
			"orange",
			pipePair1.pipeTop.size,
			pipePair1.pipeTop.pos,
		),
		ObstacleBottom1: Obstacle(
			world,
			"ObstacleBottom1",
			"orange",
			pipePair1.pipeBottom.size,
			pipePair1.pipeBottom.pos,
		),
		ObstacleTop2: Obstacle(
			world,
			"ObstacleTop2",
			"orange",
			pipePair2.pipeTop.size,
			pipePair2.pipeTop.pos,
		),
		ObstacleBottom2: Obstacle(
			world,
			"ObstacleBottom2",
			"orange",
			pipePair2.pipeBottom.size,
			pipePair2.pipeBottom.pos,
		),
	};
};
