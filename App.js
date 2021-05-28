import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import params from './src/params'
import MineField from './src/components/MineField'
import { createMinedBoard } from './src/functions'
import Mine from './src/components/Mine'

export default function App() {

	const minesAmount = () => {
		const cols = params.getColumnsAmount()
		const rows = params.getRowsAmount()
		return Math.ceil(cols * rows * params.difficultLevel)
	}

	const cols = params.getColumnsAmount()
	const rows = params.getRowsAmount()
	const createState = {
		board: createMinedBoard(rows, cols, minesAmount())
	}
	const [state, setState] = useState(createState)

	return (
	<View style={styles.container}>
		<Text>Iniciando o Mines!!!</Text>
		<Text>{params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
		<View style={styles.board}>
			<MineField board={state.board} />
		</View>
	</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	board: {
		alignItems: 'center',
		backgroundColor: '#AAA'
	},
});
