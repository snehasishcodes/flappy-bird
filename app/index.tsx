import { Text, View, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "../entities/";
import physics from "../physics.js";
import { Audio } from "expo-av";

export default function Index() {
	const [running, setRunning] = useState(false);
	const [gameEngine, setGameEngine] = useState(null);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [sound, setSound] = useState(null);

	const updateHighScore = async () => {
		try {
			const fetchedScore = await AsyncStorage.getItem("HIGHSCORE");
			const parsedFetchedScore = fetchedScore ? parseInt(fetchedScore, 10) : 0;

			if (score > parsedFetchedScore) {
				setHighScore(score);
				await AsyncStorage.setItem("HIGHSCORE", `${score}`);
			} else {
				setHighScore(parsedFetchedScore);
			}
		} catch (e) {
			console.error("Error updating high score:", e);
		}
	};

	const playMusic = async () => {
		try {
			const { sound: newSound } = await Audio.Sound.createAsync(
				require("../assets/bgm.mp3"),
				{ shouldPlay: true, isLooping: true },
			);
			setSound(newSound);
		} catch (error) {
			console.log("error on music play", error);
		}
	};

	const stopMusic = async () => {
		try {
			if (sound) {
				await sound.stopAsync();
				await sound.unloadAsync();
				setSound(null);
			}
		} catch (error) {
			console.log("error on stop music", error);
		}
	};

	useEffect(() => {
		setRunning(false);
		(async () => {
			await updateHighScore();
		})();

		return () => {
			if (sound) sound.unloadAsync();
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				//padding: 20,
			}}
		>
			<Text
				style={{
					fontSize: 40,
					margin: 30,
					fontWeight: "bold",
					textAlign: "center",
				}}
			>
				{score}
			</Text>
			<StatusBar style="auto" hidden />
			<GameEngine
				styles={{
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				}}
				ref={(ref) => setGameEngine(ref)}
				onEvent={async (ev) => {
					switch (ev.type) {
						case "gameOver":
							setRunning(false);
							gameEngine.stop();
							await stopMusic();
							await updateHighScore();
							setScore(0);
							break;
						case "incrimentScore":
							setScore(score + 1);
							//console.log(score)
							break;
					}
				}}
				systems={[physics]}
				entities={entities()}
				running={running}
			></GameEngine>
			{!running ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontWeight: "bold",
							color: "white",
							fontSize: 25,
							backgroundColor: "black",
							padding: 10,
							margin: 10,
							borderRadius: 8,
						}}
					>
						Your High Score: {highScore}
					</Text>
					<TouchableOpacity
						style={{
							backgroundColor: "black",
							padding: 15,
							color: "white",
							borderRadius: 10,
						}}
						onPress={() => {
							setScore(0);
							setRunning(true);
							playMusic();
							gameEngine.swap(entities());
						}}
					>
						<Text style={{ fontWeight: "bold", color: "white", fontSize: 30 }}>
							START GAME
						</Text>
					</TouchableOpacity>
					<Text
						style={{
							fontWeight: "bold",
							color: "white",
							fontSize: 25,
							backgroundColor: "#FE4773",
							padding: 10,
							margin: 10,
							borderRadius: 8,
						}}
					>
						Made by snehasish.xyz
					</Text>
				</View>
			) : null}
		</View>
	);
}
