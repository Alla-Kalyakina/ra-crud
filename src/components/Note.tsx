interface NoteProps {
    text: string,
    id: string,
    onClickDelete: (id: string) => void
}

const Note = ({text, id, onClickDelete} : NoteProps ) => {

    return (
        <div className="note__item">
            <p className="note__item__text">{text}</p>
            <button onClick={() => onClickDelete(id)} className="note__item__btn-delete" type="button" >X</button>
        </div>
    )
}

export default Note