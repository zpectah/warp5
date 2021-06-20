import { addMessage } from '../store/actions';

function useUiMessages(dispatch) {
	return {
		createMessage: (data: any) => dispatch(addMessage(data)),
	};
}

export default useUiMessages;
