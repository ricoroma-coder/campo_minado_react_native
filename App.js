import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { 
	StyleSheet, 
	Text, 
	View, 
	Alert 
} from 'react-native'
import params from './src/params'
import MineField from './src/components/MineField'
import { 
	createMinedBoard,
	cloneBoard,
	openField,
	hadExplosion,
	wonGame,
	showMines,
	invertFlag
} from './src/functions'
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
		board: createMinedBoard(rows, cols, minesAmount()),
		won: false,
		lost: false
	}
	const [state, setState] = useState(createState)

	const onOpenField = (row, column) => {
		const board = cloneBoard(state.board)
		openField(board, row, column)
		const lost = hadExplosion(board)
		const won = wonGame(board)

		if (lost) {
			showMines(board)
			Alert.alert('Perdeu', 'Que burro')
		}

		if (won) Alert.alert('Parabéns', 'Ganhou')

		setState({ board: board, lost: lost, won: won })
	}

	const onSelectField = (row, column) => {
		const board = cloneBoard(state.board)
		invertFlag(board, row, column)
		const won = wonGame(board)

		if (won) Alert.alert('Parabéns', 'Ganhou')

		setState({ board: board, won: won })
	}

	return (
	<View style={styles.container}>
		<Text>Iniciando o Mines!!!</Text>
		<Text>{params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
		<View style={styles.board}>
			<MineField board={state.board} 
				onOpenField={onOpenField} 
				onSelectField={onSelectField} />
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
