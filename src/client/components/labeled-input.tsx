import React from 'react'
import Input from 'client/components/input'

interface Props {
  label: string,
  onChange: () => void
  type: 'checkbox' | 'text'
}

const LabeledInput: React.FC<Props> = ({ 
label,
onChange,
type
}) => (
	<div>
		<label>
		{label}<br />
		<Input 
			onChange={onChange}
			type={type}
		/>
		</label>
	</div>
)

export default LabeledInput