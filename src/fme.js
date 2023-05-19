import Origo from 'Origo';

const fme = function fme(options = {}) {
  const {
    title = 'Hämta data'
  } = options;

  const icon = '#fa-download';
  let fmeButton;

  let viewer;
  let target;
  let modal;
  let content;
  let extent;
  let format;
  let layers;
  let layerName;
  let layerTitle;

  function getLayerTitle() {
    let titles = '';
    layers.forEach((el) => {
      if (el.getVisible() === true && el.get('fme')) {
        titles += `<li>${el.get('title')}</li>`;
      }
    });
    return titles;
  }

  function getLayerName() {
    let layerNames = '';
    layers.forEach((el) => {
      if (el.getVisible() === true && el.get('fme')) {
        layerNames += `${el.get('name')};`;
      }
    });
    layerNames = layerNames.split(';').join('%20');
    return layerNames;
  }

  function getExtent() {
    const map = viewer.getMap();
    const size = map.getSize();
    extent = map.getView().calculateExtent(size);
    extent.forEach((coordinate, j) => {
      extent[j] = Math.round(coordinate * 1) / 1;
    });
    extent = encodeURI(extent).replace(/,/g, '%20');
    return extent;
  }

  function appendDropdownFormat() {
    const dropdown = document.getElementById('input-DestinationFormat');
    for (let i = 0; i < options.destinationFormat.length; i += 1) {
      const opt = options.destinationFormat[i];
      const el = document.createElement('option');
      el.textContent = opt;
      el.value = opt;
      dropdown.appendChild(el);
    }
  }

  function sendToFME() {
    format = document.getElementById('input-DestinationFormat');
    format = `&DestinationFormat=${format.options[format.selectedIndex].text}`;
    layerName = `&layer=${getLayerName()}`;
    extent = `&extent=${getExtent()}`;
    let fmeUrl = options.url + format + layerName + extent;
    if (options.username) {
      fmeUrl += `&username=${localStorage.getItem('username')}`;
    }
    window.open(fmeUrl, '_self');
  }

  function styleFMEList() {
    const fmeListDiv = document.querySelector('#fme-list');
    const fmeList = fmeListDiv.querySelectorAll('li');
    fmeList.forEach((e) => {
      e.style.listStyle = 'disc';
      e.style.margin = 'auto';
    });
  }

  return Origo.ui.Component({
    name: 'fme',
    onInit() {
      fmeButton = Origo.ui.Button({
        cls: 'o-fme padding-small icon-smaller round light box-shadow',
        click() {
          layers = viewer.getLayers();
          layerTitle = getLayerTitle();

          if (layerTitle) {
            content = `<br>Nedan listas de lager som du kommer att hämta från den aktuella vyn:<br><br><div id="fme-list">${layerTitle}</div><br>
                      <select id="input-DestinationFormat"><option>Välj format</option></select>
                      <input id="o-fme-download-button" type="button" value="Spara" disabled></input>`;
          } else {
            content = '<p style="font-style:italic;">Du måste tända ett nedladdningsbart lager i kartan för att kunna hämta data.</p>';
          }

          modal = Origo.ui.Modal({
            title,
            content,
            target: viewer.getId()
          });
          this.addComponent(modal);
          if (layerTitle) {
            styleFMEList();
            appendDropdownFormat();

            document.querySelector('#input-DestinationFormat').addEventListener('change', () => {
              if (document.querySelector('#input-DestinationFormat').selectedIndex !== 0) {
                document.querySelector('#o-fme-download-button').removeAttribute('disabled');
              } else {
                document.querySelector('#o-fme-download-button').disabled = true;
              }
            });
            document.querySelector('#o-fme-download-button').addEventListener('click', () => {
              sendToFME();
              modal.closeModal();
            });
          }
        },
        icon,
        tooltipText: title,
        tooltipPlacement: 'east'
      });
    },

    onAdd(evt) {
      viewer = evt.target;
      if (!target) target = `${viewer.getMain().getNavigation().getId()}`;
      this.addComponents([fmeButton]);
      this.render();
    },
    render() {
      const htmlString = fmeButton.render();
      const el = Origo.ui.dom.html(htmlString);
      document.getElementById(target).appendChild(el);
      this.dispatch('render');
    }
  });
};

export default fme;
