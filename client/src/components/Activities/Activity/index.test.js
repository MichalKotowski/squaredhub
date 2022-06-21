import Activity from './index.js'
import { render, fireEvent, screen } from '../../../test-utils.js'

const dummyData = {
	id: 1,
	user_id: 1,
	name: 'test',
	date_created: '2022-05-11T00:00:00.000Z',
	color: '#03a9f4'
}

it('has not empty text field', () => {
	render(<Activity data={dummyData} />)

	expect(
		screen.getByLabelText('Name').value
	).not.toHaveLength(0)
})

it('has not empty text field after text removal', () => {
	render(<Activity data={dummyData} />)
	const input = screen.getByLabelText('Name')

	fireEvent.change(input, {target: {value: ''}})

	setTimeout(() => {
		expect(
			input.value
		).not.toHaveLength(0)
	}, 0)
})