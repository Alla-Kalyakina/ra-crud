import React from "react";

interface PropsForm {
    onSubmitForm: React.FormEventHandler<HTMLFormElement>,
    onChangeTextarea: React.ChangeEventHandler<HTMLTextAreaElement>,
    value: string,
}

const Form = ({onSubmitForm, onChangeTextarea, value}: PropsForm) => {

    return (
        <form onSubmit={onSubmitForm}>
            <textarea value={value} onChange={onChangeTextarea}/>
                <button className='btn__submit' type="submit">Отправить</button>
        </form>
    )
}

export default Form;
