import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { 
	StyleSheet,
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
	invertFlag,
	flagsUsed
} from './src/functions'
import Header from './src/components/Header'
import LevelSelection from './src/screen/LevelSelection'

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
		lost: false,
		showLevelSelection: false,
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

		if (won) {
			Alert.alert('Parabéns', 'Ganhou')
		}

		setState({ board: board, lost: lost, won: won, showLevelSelection: false })
	}

	const onSelectField = (row, column) => {
		const board = cloneBoard(state.board)
		invertFlag(board, row, column)
		const won = wonGame(board)

		if (won) {
			Alert.alert('Parabéns', 'Ganhou')
		}

		setState({ board: board, won: won, showLevelSelection: false })
	}

	const onLevelSelected = level => {
		params.difficultLevel = level
		createState.board = createMinedBoard(rows, cols, minesAmount())
		setState(createState)
	}

	return (
	<View style={styles.container}>
		<LevelSelection isVisible={state.showLevelSelection}
			onLevelSelected={onLevelSelected} 
			onCancel={() => setState({ board: state.board, showLevelSelection: false })} />
		<Header flagsLeft={minesAmount() - flagsUsed(state.board)} 
			onNewGame={() => setState(createState)} 
			onFlagPress={() => setState({ board: state.board, showLevelSelection: true })} />
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
