import random from "./rand.js";
import { Dimensions } from "react-native";

const windowH = Dimensions.get("window").height;
const windowW = Dimensions.get("window").width;

export default (addToPosX = 0) => {
	let yPosTop = -random(300, windowH - 100);

	const pipeTop = {
		pos: { x: windowW + addToPosX, y: yPosTop },
		size: { height: windowH * 2, width: 75 },
	};
	const pipeBottom = {
		pos: { x: windowW + addToPosX, y: windowH * 2 + 200 + yPosTop },
		size: { height: windowH * 2, width: 75 },
	};

	return { pipeTop, pipeBottom };
};
