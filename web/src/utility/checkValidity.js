function checkValidity(value, rules, password=null){
	let isValid = true;
	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}
	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}
	if(rules.isEmail){
		isValid = value.match(/\S+@\S+\.\S+/)
	}
	if(rules.isEqual){
		isValid = value === password
	}
	return isValid;
};

export default checkValidity