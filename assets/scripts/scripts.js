document.addEventListener("DOMContentLoaded", function() {
    const sections = ['chapters', 'journals', 'conferences'];

    sections.forEach(section => {
        fetch(`/assets/publications/${section}.json`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById(section);
                if (data && data.length > 0) {
                    data.forEach(publication => {
                        const item = document.createElement('li');
                        item.className = 'publication-item';
                        
                        const title = document.createElement('a');
                        title.href = publication.url;
                        title.target = '_blank';
                        title.textContent = publication.title;
                        title.className = 'publication-title';

                        const authors = document.createElement('div');
                        authors.className = 'publication-authors';
                        authors.innerHTML = publication.authors.map(author => 
                            author === "Carlos Melo" ? `<span class="bold-author">${author}</span>` : author
                        ).join(', ');

                        const abstractButton = document.createElement('button');
                        abstractButton.className = 'abstract-button';
                        abstractButton.textContent = 'Abstract';
                        abstractButton.onclick = () => {
                            const content = item.querySelector('.abstract-content');
                            if (content.style.display === 'none') {
                                content.style.display = 'block';
                                abstractButton.textContent = 'Hide Abstract';
                            } else {
                                content.style.display = 'none';
                                abstractButton.textContent = 'Abstract';
                            }
                        };

                        const pdfButton = document.createElement('a');
                        pdfButton.href = publication.pdf;
                        pdfButton.download = publication.title;
                        pdfButton.className = 'pdf-button';
                        pdfButton.innerHTML = '<img src="assets/img/pdf-icon.png" alt="PDF Icon">';

                        const abstractContent = document.createElement('div');
                        abstractContent.className = 'abstract-content';
                        abstractContent.textContent = publication.abstract || "No abstract available.";

                        const buttonsContainer = document.createElement('div');
                        buttonsContainer.className = 'publication-buttons';
                        buttonsContainer.appendChild(abstractButton);
                        buttonsContainer.appendChild(pdfButton);

                        item.appendChild(title);
                        item.appendChild(authors);
                        item.appendChild(buttonsContainer);
                        item.appendChild(abstractContent);

                        container.appendChild(item);
                    });
                } else {
                    const noPublications = document.createElement('p');
                    noPublications.textContent = "No publications available.";
                    container.appendChild(noPublications);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});
