import React, { Component } from 'react';

import galleryApi from '../services/gallery-api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ErrorMessage from './ErrorMessage/ErrorMessage';

export class App extends Component {
  state = {
    search: '',
    message: '',
    status: 'idle',
    gallery: [],
    selected: null,
    page: 1,
    loader: false,
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.handleAPI();
    }
  }

  onSubmitForm = state => {
    if (!state) {
      return this.setState({
        status: 'rejected',
        message: 'string must not be empty',
      });
    }

    this.setState({
      search: state,
      gallery: [],
      page: 1,
      showBtn: false,
    });
  };

  onSelected = e => {
    if (e.target.src === undefined) {
      return;
    }
    this.setState({ selected: { url: e.target.src, alt: e.target.alt } });
  };

  closeModal = () => {
    this.setState({ selected: null });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleAPI = () => {
    const { search, page } = this.state;
    this.setState({ loader: true, status: 'pending ' });

    galleryApi
      .fetchGallery(page, search)
      .then(data => {
        if (data.total === 0) {
          return this.setState({
            status: 'rejected',
            message: 'Nothing found for your request :(',
          });
        }
        return this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...data.hits],
            status: 'resolved',
            showBtn: page < Math.ceil(data.total / 12),
          };
        });
      })
      .catch(() =>
        this.setState({
          status: 'rejected',
          message: 'Ooops... something went wrong :(',
        })
      )
      .finally(() => this.setState({ loader: false }));
  };

  render() {
    const { status, message, gallery, loader, showBtn, selected } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmitForm} />

        {status === 'pending' && <Loader />}

        {status === 'rejected' && <ErrorMessage message={message} />}

        {status === 'resolved' && (
          <>
            <ImageGallery onSelected={this.onSelected}>
              {gallery !== null &&
                gallery.map(({ id, largeImageURL, tags }) => (
                  <ImageGalleryItem
                    key={id}
                    url={largeImageURL}
                    tags={tags}
                    id={id}
                  />
                ))}
            </ImageGallery>

            {status === 'resolved' && showBtn && (
              <Button gallery={gallery} onClick={this.handleLoadMore} />
            )}
          </>
        )}

        {selected && <Modal img={selected} closeModal={this.closeModal} />}
      </>
    );
  }
}
