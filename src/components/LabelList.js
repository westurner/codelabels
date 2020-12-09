
import { h } from 'preact'
import PropTypes from 'prop-types'

import Label from './Label'

const LabelList = ({ labels=[] }) => (
  <div>
    {labels.length > 0 && <h6>Labels</h6>}
    <ul class="labellist" style="list-style-type:none; padding-inline-start: 0">
      {labels.map((label, index) => (
        <Label key={index} label={label} onclick={() => onLabelClick(index)} />
      ))}
    </ul>
  </div>
)

LabelList.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired
  ).isRequired,
  onLabellick: PropTypes.func.isRequired
}

export default LabelList