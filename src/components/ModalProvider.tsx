import { createContext, useContext, useEffect, useReducer } from 'react';
import Modal from 'react-modal';

const ModalContext = createContext<ModalAPI>({
    get isOpen() { return false },
    open: () => {},
    close: () => {},
});

function ModalProvider({ children }: ModalProviderProps) {
    const [ modalState, dispatch ] = useReducer(modalReducer, {
        isOpen: false,
        content: null,
    });
    const modalApi: ModalAPI = {
        isOpen: modalState.isOpen,
        open: (content: React.ReactNode) => dispatch({ type: 'open', content }),
        close: () => dispatch({ type: 'close' }),
    }

    useEffect(
        () => {
            Modal.setAppElement("#modal-provider");
        },
        []
    );

    return (
        <div id="modal-provider">
            <ModalContext.Provider value={modalApi}>
                <Modal
                    isOpen={modalState.isOpen}
                    onRequestClose={() => dispatch({ type: 'close' })}
                    contentLabel="Modal"
                >
                    {modalState.content}
                </Modal>

                {children}
            </ModalContext.Provider>
        </div>
    )
}

interface ModalState {
    isOpen: boolean;
    content: React.ReactNode | null;
}

interface ModalAction {
    type: 'open' | 'close';
    content?: React.ReactNode;
}

function modalReducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.type) {
        case 'open':
            return {
                isOpen: true,
                content: action.content,
            };
        case 'close':
            return {
                isOpen: false,
                content: null,
            };
        default:
            return state;
    }
}

function useModal() {
    return useContext(ModalContext);
}

interface ModalProviderProps {
    children: React.ReactNode;
}

interface ModalAPI {
    readonly isOpen: boolean;
    open: (content: React.ReactNode) => void;
    close: () => void;
}

export { useModal };
export default ModalProvider;