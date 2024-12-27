import Matter from "matter-js";
import { Dimensions } from "react-native";
import getPipePairSizePos from "./utils/getPipePairSizePos.js";

const windowH = Dimensions.get("window").height;
const windowW = Dimensions.get("window").width;

export default (entities, { touches, time, dispatch }) => {
	let engine = entities.physics.engine;

	touches
		.filter((t) => t.type === "press")
		.forEach((t) => {
			Matter.Body.setVelocity(entities.Bird.body, {
				x: 0,
				y: -7.5,
			});
		});

	Matter.Engine.update(engine, time.delta);

	for (let i = 1; i <= 2; i++) {
		// console.log("f")

		if (
			entities[`ObstacleTop${i}`].body.bounds.max.x <= 50 &&
			!entities[`ObstacleTop${i}`].point
		) {
			entities[`ObstacleTop${i}`].point = true;
			// console.log("e")
			dispatch({ type: "incrimentScore" });
		}

		if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 0) {
			const newPipe = getPipePairSizePos(windowW * 0.9);

			//Matter.Body.setPosition(entities[`ObstacleTop${i}`].body, newPipe.pipeTop.pos);
			//Matter.Body.setPosition(entities[`ObstacleBottom${i}`].body, newPipe.pipeBottom.pos)

			Matter.Body.setPosition(
				entities[`ObstacleTop${i}`].body,
				newPipe.pipeTop.pos,
			);
			Matter.Body.setPosition(
				entities[`ObstacleBottom${i}`].body,
				newPipe.pipeBottom.pos,
			);
			entities[`ObstacleTop${i}`].point = false;
		}

		Matter.Body.translate(entities[`ObstacleTop${i}`].body, { x: -3, y: 0 });
		Matter.Body.translate(entities[`ObstacleBottom${i}`].body, { x: -3, y: 0 });
	}

	//Matter.Body.translate(entities["ObstacleTop1"].body, {x:-3,y:0});
	//Matter.Body.translate(entities["ObstacleBottom1"].body, {x:-3,y:0});

	Matter.Events.on(engine, "collisionStart", (event) => {
		dispatch({ type: "gameOver" });
	});

	return entities;
};
