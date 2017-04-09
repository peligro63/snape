import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Video from './Video';

const ModalControl = styled.div`
  color: #9c9c9c;
  position: fixed;
  top: 5px;
  right: 5px;
  font-size: 20px;
`;

const ImageLightbox = styled.img`
  display: flex;
  height: 100%;
  margin: 0 auto;
  background-size:contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${props => `url${props.src}`};
`;

const CloseIcon = styled.i`
  font-size: 40px;
  cursor: pointer;
`;

export default function MediaModal(props) {
  const { infoHash, fileIndex, file, showModal, onCloseClick } = props;

  if (!fileIndex || !file) return null;

  const style = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.95)',
      zIndex: 99,
    },
    content: {
      background: 'transparent',
      border: 'none',
    },
  };

  const mq = window.matchMedia('(max-width: 1220px)');

  if (mq.matches) {
    style.content.left = 0;
    style.content.right = 0;
    style.content.padding = 0;
  }

  const src = `http://localhost:${SERVER_PORT}/api/download/${infoHash}/${+fileIndex}/${file.name}`;

  return (
    <Modal
      style={style}
      isOpen={showModal}
      contentLabel={'Modal'}
    >
      <ModalControl>
        <CloseIcon onClick={onCloseClick} className="mdi mdi-close close-modal" />
      </ModalControl>
      {file.type.indexOf('video') >= 0 && <Video src={src} />}
      {file.type.indexOf('image') >= 0 && <ImageLightbox src={src} />
      }
    </Modal>
  );
}

MediaModal.propTypes = {
  infoHash: PropTypes.string.isRequired,
  fileIndex: PropTypes.number.isRequired,
  showModal: PropTypes.bool.isRequired,
  file: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onCloseClick: PropTypes.func.isRequired,
};