import style from './App.module.css';
import { useState } from 'react';

export default function App() {
	const [screenStyle, setScreenStyle] = useState({ color: '#0f0' });
	const [screenShow, setScreenShow] = useState('0');
	const [currentOperator, setCurrentOperator] = useState(null);
	const [storedValue, setStoredValue] = useState(null);

	const array = [
		{ id: 2, value: 1 },
		{ id: 3, value: 2 },
		{ id: 4, value: 3 },
		{ id: 5, value: 4 },
		{ id: 6, value: 5 },
		{ id: 7, value: 6 },
		{ id: 8, value: 7 },
		{ id: 9, value: 8 },
		{ id: 10, value: 9 },
		{ id: 1, value: 0 },
		{ id: 11, value: '+' },
		{ id: 12, value: '-' },
		{ id: 13, value: '=' },
		{ id: 14, value: 'C' },
	];

	const operators = array.filter((item) => typeof item.value === 'string');
	const numbers = array.filter((item) => typeof item.value === 'number');

	const calculateResult = (storedValue, currentValue, operator) => {
		const num1 = Number(storedValue);
		const num2 = Number(currentValue);

		if (operator === '+') {
			return num1 + num2;
		} else if (operator === '-') {
			return num1 - num2;
		}
	};

	const screen = (
		<input
			value={screenShow}
			style={screenStyle}
			className={style.screen}
			type="text"
			readOnly
		></input>
	);

	const onClick = (value) => {
		if (value === 'C') {
			setScreenShow('0');
			setScreenStyle({ color: '#0f0' });
			setCurrentOperator(null);
			setStoredValue(null);
		} else if (value === '=') {
			if (currentOperator && storedValue !== null) {
				const result = calculateResult(storedValue, screenShow, currentOperator);
				setScreenStyle({ color: 'blue' });
				setScreenShow(String(result));
				setCurrentOperator(null);
				setStoredValue(null);
			}
		} else if (value === '+' || value === '-') {
			setStoredValue(screenShow);
			setScreenShow('0');
			setCurrentOperator(value);
		} else {
			setScreenShow((prevValue) => {
				const newValue =
					prevValue === '0' ? String(value) : prevValue + String(value);
				setScreenStyle({ color: '#0f0' });
				return newValue;
			});
		}
	};

	const buttons = (
		<div className={style.buttons}>
			<div className={style.operators}>
				{operators.map(({ id, value }) => (
					<button
						onClick={() => onClick(value)}
						value={value}
						className={`${style.buttonSign} ${style.button}`}
						key={id}
					>
						{value}
					</button>
				))}
			</div>
			<div className={style.numberBlock}>
				{numbers.map(({ id, value }) => (
					<button
						onClick={() => onClick(value)}
						value={value}
						className={`${style.buttonNumber} ${style.button}`}
						key={id}
					>
						{value}
					</button>
				))}
			</div>
		</div>
	);
	return (
		<div className={style.app}>
			<header className={style.header}>
				<div className={style.calculator}>
					{screen}
					{buttons}
				</div>
			</header>
		</div>
	);
}
