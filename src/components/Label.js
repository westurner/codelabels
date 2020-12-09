
import { h } from 'preact'
import PropTypes from 'prop-types'

const Label = ({ label }) => {
    return <li>
      <div class="form-row">
        <div class="col-md-3">
          <span
            class="color"
            style={
              `background-color:${label.color}; width: 2em; display: inline-block; margin: 0 8px; border: 1px solid #eee`}
            >&nbsp;</span>
          <input type="text" readonly class="hexcode" style="width: 4em; display: inline-block; border: 0;" value={label.color} />
        </div>
        <div class="col-md-4">
          <input type="text" readonly class="name" style="width: 100%; border:0px" value={label.name} />
        </div>
        <div class="col-md-5">
          {label.description && label.description !== "" &&
          <input type="text" readonly class="description" style="width: 100%; border: 0px;" value={label.description} /> }
        </div>
      </div>
    </li>
}
Label.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Label