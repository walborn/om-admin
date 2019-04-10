### usage
```jsx harmony
state = { animals: [
   { key: 'seagull', value: false, children: 'Чайка' },
   { key: 'rabbit', value: false, children: 'Кролик' },
   { key: 'camel', value: false, children: 'Верблюд' },
] };
//...
render: () =>
    <div>
        ...
        <CheckBoxList
            className="checkbox-animals"
            type="radio"
            list={this.state.animals}
            onChange={animals => this.setState({ animals })}
            readonly
        />
        ...
    </div>
```
/**
 * Usage:
 * Необходимо задать названия чекбоксов, а так же их значения с ключами
 * Каждое изменение вызывает событие onChange, в котором передается
 * измененный список { inputKey: isChecked }
 * - labels - список названий чекбоксов
 * - list (isRequired) - список состояний чекбоксов
 * - order - порядок, в котором будет отображаться список
 * - readonly - запрещает изменение выбранных чекбоксов
 *
 <CheckBoxList
     labels={{ seagull: 'Чайка', rabbit: 'Кролик', camel: 'Верблюд' }}
     selected={{ seagull: false, rabbit: true, camel: true }}
     onChange={(list, updated, element) => this.setState({ list }, callback) }
 />
 */
### props
* value - значение, которое присваивается снаружи компонента.
* readOnly - запрещение изменения компонента
* disabled - работает также, как и readOnly, но в добавок еще показывает, что компонент неактивен, не позволяя даже выделять текст в нем
* type - тип инпута - квадратный (square) или круглый (circle) (по умолчанию checkbox)

* ...props (className, name, maxLength, onBlur, onKey..., ) - все незадокументированые пропсы передаются в input               

### methods
* onChange(value, event) - хендлер, который висит на событие изменения компонента
