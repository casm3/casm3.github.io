document.addEventListener("DOMContentLoaded", function() {
    const sections = ['chapters', 'journals', 'conferences'];

    sections.forEach(section => {
        fetch(`/assets/publications/${section}.json`)
            .then(response => response.json())
            .then(data => {
                const list = document.getElementById(section);
                if (data && data.length > 0) {
                    data.forEach(publication => {
                        const listItem = document.createElement('li');
                        listItem.classList.add('publication-item');
                        
                        // Title Link
                        const titleLink = document.createElement('a');
                        titleLink.href = publication.url;
                        titleLink.target = '_blank';
                        titleLink.textContent = publication.title;
                        titleLink.classList.add('publication-title');

                        // Authors
                        const authorsList = document.createElement('p');
                        authorsList.classList.add('publication-authors');

                        // Process authors
                        publication.authors.forEach((author, index) => {
                            const authorSpan = document.createElement('span');
                            if (author === "Carlos Melo") {
                                authorSpan.classList.add('bold-author');
                            }
                            authorSpan.textContent = author;
                            authorsList.appendChild(authorSpan);
                            if (index < publication.authors.length - 1) {
                                authorsList.appendChild(document.createTextNode(', '));
                            }
                        });

                        // Buttons
                        const buttonsDiv = document.createElement('div');
                        buttonsDiv.classList.add('publication-buttons');

                        // Abstract Button
                        if (publication.abstractUrl) {
                            const abstractButton = document.createElement('a');
                            abstractButton.href = publication.abstractUrl;
                            abstractButton.textContent = 'Abstract';
                            abstractButton.classList.add('btn', 'abstract-button');
                            abstractButton.target = '_blank';
                            buttonsDiv.appendChild(abstractButton);
                        }

                        // PDF Button
                        if (publication.pdf) {
                            const pdfButton = document.createElement('a');
                            pdfButton.href = publication.pdf;
                            pdfButton.classList.add('btn', 'pdf-button');
                            pdfButton.download = publication.title;
                            pdfButton.target = '_blank';

                            // Add PDF icon
                            const pdfIcon = document.createElement('span');
                            pdfIcon.classList.add('pdf-icon');
                            pdfButton.appendChild(pdfIcon);

                            buttonsDiv.appendChild(pdfButton);
                        }

                        // Append title, authors, and buttons to list item
                        listItem.appendChild(titleLink);
                        listItem.appendChild(authorsList);
                        listItem.appendChild(buttonsDiv);

                        // Append list item to list
                        list.appendChild(listItem);
                    });
                } else {
                    const noPublications = document.createElement('p');
                    noPublications.textContent = "No publications available.";
                    list.appendChild(noPublications);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                const list = document.getElementById(section);
                const errorMessage = document.createElement('p');
                errorMessage.textContent = "Error loading publications.";
                list.appendChild(errorMessage);
            });
    });
});
