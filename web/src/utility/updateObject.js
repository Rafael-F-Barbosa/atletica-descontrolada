// Update objects in a immutable way
function updateObject(oldObject, updatedProperties){
  return {
		...oldObject,
		...updatedProperties
	};
}

export default updateObject