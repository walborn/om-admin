### usage
```jsx harmony
state = { rabbit: false };
//...
render: () =>
    <div>
        ...
        <CheckBox
            className="checkbox-rabbit"
            type="square"
            value={this.state.rabbit}
            onChange={rabbit => this.setState({ rabbit })}
            readonly
        >
            Кролик <i>test</i>
        </CheckBox>
        ...
    </div>
```

### props
* className, style - имеют тот же смысл, что и стандартные, передаются в обертку компонента
* value - значение, которое присваивается снаружи компонента.
* readOnly - запрещение изменения компонента
* disabled - работает также, как и readOnly, но в добавок еще показывает, что компонент неактивен, не позволяя даже выделять текст в нем
* type - тип инпута - квадратный (square) или круглый (circle) (по умолчанию checkbox)

* ...props (name, maxLength, onBlur, onKey..., ) - все незадокументированые пропсы передаются в input               

### methods
* onChange(value, event) - хендлер, который висит на событие изменения компонента
