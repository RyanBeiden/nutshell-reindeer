import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';

import './dinoCards.scss';
import staffData from '../../helpers/data/staffData';
import jobsData from '../../helpers/data/jobsData';

const updateDinoHandlers = (e) => {
  staffData.getStaff()
    .then((staff) => {
      dinoData.getDinosWithHandlers()
        .then((dinos) => {
          dinos.forEach((dino) => {
            if (dino.assignees.length <= 1 && dino.id === e.target.dataset.dinoToChange) {
              staff.forEach((person) => {
                if ($(e.target).val() === person.name) {
                  const staffId = person.id;
                  const department = 'dinosaurs';
                  const job = dino.id;

                  jobsData.assignNewJob(staffId, department, job)
                    .then(() => {
                      utils.clearModal();
                      // eslint-disable-next-line no-use-before-define
                      checkDinoHandlers();
                    });
                }
              });
            }
          });
        });
    })
    .catch((err) => console.error(err));
};

const runDinoModal = () => {
  staffData.getStaff()
    .then((staff) => {
      dinoData.getDinosWithHandlers()
        .then((dinos) => {
          let domString = `
          <div class="modal check-dino-modal" id="check-dino-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="check-dino-label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="check-dino-label"><i class="fas fa-exclamation-triangle pr-2"></i> Dinos need more handlers!</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" id="close-dino-modal">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <div class="dinos">
        `;

          dinos.forEach((dino) => {
            if (dino.assignees.length <= 1) {
              domString += `
              <div class="dino-section">
                <p class="handler"><span class="dino-name">${dino.name}</span> needs ${dino.assignees.length === 0 ? '<b>2</b> handlers' : '<b>1</b> handler'}</p>
                <div class="update-area">
                  <select name="update-dino-handler" id="update-dino-handler" class="form-control ${dino.id}" data-dino-to-change=${dino.id}>`;

              staff.forEach((person) => {
                if (person.assignedTo === '' && person.isActive === true) {
                  domString += `<option id="${person.id}">${person.name}</option>`;
                }
              });

              domString += `        
                </select>
              </div>
            </div>
            `;
            }
          });
          domString += `
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
          utils.printToDom('#check-dino', domString);
          $('#check-dino-modal').modal('show');
          $('body').on('click', '#close-dino-modal', utils.clearModal);
          dinos.forEach((dino) => {
            $(`.${dino.id}`).prop('selectedIndex', -1);
          });
        });
    })
    .catch((err) => console.error('Getting handlers for dinos did not work -> ', err));
};

const checkDinoHandlers = () => {
  dinoData.getDinosWithHandlers()
    .then((dinos) => {
      dinos.forEach((dino) => {
        if (dino.assignees.length <= 1) {
          runDinoModal();
        }
      });
    })
    .catch((err) => console.error('Getting handlers for dino modal did not work -> ', err));
};

export default { checkDinoHandlers, updateDinoHandlers };