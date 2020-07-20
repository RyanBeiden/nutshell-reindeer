const editEquipDomStringBuilder = (collectionId, equipObj) => {
  let domString = `            
        <form class="edit-equip m-5 editForm" id=${collectionId}>
        <h2>Edit Equipment</h2>
        <div class="form-group">
            <label for="edit-equip-name">Name:</label>
            <input type="text" class="form-control" id="edit-equip-name" placeholder="Cordyceps" value=${equipObj.equipName}>
        </div>
        <div class="form-group">
            <label for="edit-equip-type">Type:</label>
            <input type="text" class="form-control" id="edit-equip-type" placeholder="M" value=${equipObj.equipType}>
        </div>
        <div class="form-group">
            <label for="edit-equip-location">Location:</label>
            <input type="text" class="form-control" id="edit-equip-location" placeholder="Farm" value=${equipObj.equipLocation}>
        </div>
        <div class="form-group">
            <label for="edit-equip-imgUrl">Image URL</label>
            <input type="text" class="form-control" id="edit-equip-imgUrl" placeholder="Image URL" value=${equipObj.equipImgUrl}>
        </div>
        <div class="form-group">
        <div class="form-check">
            `;
  if (equipObj.equipOperational) {
    domString += '<input class="form-check-input" id="edit-equip-operational" type="checkbox" checked>';
  } else {
    domString += '<input class="form-check-input" id="edit-equip-operational" type="checkbox">';
  }
  domString += `
        <label class="form-check-label" for="edit-equip-operational">Is Operational</label>              
        </div>
        </div>
        <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
        <button class="btn btn-warning backButton" id="equip-editor-cancel">Cancel</button>
        </form>
    `;
  return domString;
};

export default { editEquipDomStringBuilder };