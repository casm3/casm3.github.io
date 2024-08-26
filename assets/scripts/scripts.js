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
                        const link = document.createElement('a');
                        link.href = publication.url;
                        link.target = '_blank';
                        link.textContent = publication.title;
                        
                        if (publication.pdf) {
                            const downloadLink = document.createElement('a');
                            downloadLink.href = publication.pdf;
                            downloadLink.download = publication.title;
                            downloadLink.textContent = " (PDF)";
                            listItem.appendChild(link);
                            listItem.appendChild(downloadLink);
                        } else {
                            listItem.appendChild(link);
                        }
                        
                        list.appendChild(listItem);
                    });
                } else {
                    const noPublications = document.createElement('p');
                    noPublications.textContent = "No publications available.";
                    list.appendChild(noPublications);
                }
            });
    });
});
