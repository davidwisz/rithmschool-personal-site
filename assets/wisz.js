var wisz = {

	toggleSection : function(thisClickee) {
		if (thisClickee.classList.contains('expanded') && !thisClickee.classList.contains('all')) {
			wisz.collapseSection(thisClickee);
		}
		else {
			wisz.expandSection(thisClickee);
		}
	},
	
	collapseSection : function(thisClickee) {
		thisClickee.classList.remove('expanded');
		thisClickee.classList.remove('all');
		var thisArticle = document.querySelector(thisClickee.getAttribute('href') + ' article');
		//SLIDEUP:
		thisArticle.style.maxHeight = '0';
		window.setTimeout(function(){ thisArticle.style.opacity = '0'; }, 200);
		wisz.scrollToTop();
	},
	
	expandSection : function(thisClickee) {
		// remove both 'expanded' and 'all' class names from all sections
		var allTitles = document.querySelectorAll('h3 .toggle-section');
		allTitles.forEach(function(title) {
			title.classList.remove('expanded');
			title.classList.remove('all');
		});
		// close all sections
		//SLIDEUP:
		var allArticles = document.querySelectorAll('.section.home article');
		allArticles.forEach(function(article) {
			article.style.maxHeight = '0';
			window.setTimeout(function(){ article.style.opacity = '0'; }, 100);
		});
		
		// open the clicked section
    	thisClickee.classList.add('expanded');
    	//SLIDEDOWN:
		var thisArticle = document.querySelector(thisClickee.getAttribute('href') + ' article');
		thisArticle.style.maxHeight = '1300px';
		window.setTimeout(function(){ thisArticle.style.opacity = '1'; }, 200);
		wisz.scrollToTop();
	},
	
	expandAll : function() {
		var allArticles = document.querySelectorAll('.section.home article');
		allArticles.forEach(function(article) {
			article.style.maxHeight = '1300px';
			window.setTimeout(function(){ article.style.opacity = '1'; }, 200);
		});
		var allTitles = document.querySelectorAll('h3 .toggle-section');
		allTitles.forEach(function(title) {
			title.classList.remove('expanded');
			title.classList.remove('all');
		});
		wisz.scrollToTop();
	},
	
	scrollToTop : function() {
		var pageTop = document.getElementById('intro').offsetTop;
		window.scrollTo(pageTop - 120,0)
	},
	
	photoTrigger : function(thisClickee) {
		var photoUrl = thisClickee.getAttribute('href');
		var photoModal = document.getElementById('photo-modal');
		photoModal.style.display = 'block';
		photoModal.style.opacity = '1';
		/*var topNumberOne = document.body.scrollTop + 10;
		var topNumberTwo = document.querySelector('main').scrollTop + 10;
		var tn = topNumberOne > topNumberTwo ? topNumberOne : topNumberTwo;*/
		var topNumber = window.pageYOffset + 10;
		console.log(window.pageYOffset);
		photoModal.style.top = topNumber + 'px';
		document.getElementById('photo-modal-img').src = photoUrl;
	},
	
	closeButton : function(thisClickee) {
		var clickeeHref = thisClickee.getAttribute('href');
		if (clickeeHref == 'photo-modal') {
			var photoModal = document.getElementById('photo-modal');
			photoModal.style.top = 600;
			photoModal.style.opacity = 0;
			photoModal.style.display = 'none';
			document.getElementById('photo-modal-img').src = '/assets/img/loading.gif';
		}
		else {
			document.getElementById(clickeeHref).style.display = 'none';
		}
	}

}

// AFTER DOM IS LOADED
document.addEventListener("DOMContentLoaded", function() {

	//CLICK HANDLER ON SECTION TITLES TO TOGGLE OPEN OR CLOSED CORRESPONDING SECTION
	var toggleLinks = document.querySelectorAll('.toggle-section');
	for (var toggler of toggleLinks) { /* THIS for ... of LOOP SYNTAX THROWS AN ERROR IN IE */
    	toggler.addEventListener('click', function(e) {
			e.preventDefault();
			wisz.toggleSection(e.target);
		});
	}
	
	//CLICK HANDLER FOR 'EXPAND ALL' LINK TO EXPAND ALL SECTIONS AT ONCE
	document.getElementById('expand-all').addEventListener('click', function(e) {
		e.preventDefault();
		wisz.expandAll();
	});
	
	//CLICK HANDLER TO OPEN PHOTO POPOVER
	for (var launcher of document.querySelectorAll('.photo-trigger')) {
		launcher.addEventListener('click', function(e) {
		e.preventDefault();
		wisz.photoTrigger(e.target);
		});
	}
	
	//CLICK HANLDER TO CLOSE PHOTO POPOVER
	for (var closer of document.querySelectorAll('.close-button')) {
		closer.addEventListener('click', function(e) {
		e.preventDefault();
		wisz.closeButton(e.target);
		});
	}
	
	//CLICK HANDLER FOR 'SCROLL UP' LINK IN FOOTER
	document.getElementById('footer-arrow-up').addEventListener('click', function(e) {
		e.preventDefault();
		wisz.scrollToTop();
	});
	
	//CLICK HANDLER FOR HAMBURGER LINK TO TOGGLE ON OR OFF THE NAV MENU
	document.getElementById('nav-menu-trigger').addEventListener('click', function(e) {
		e.preventDefault();
		var navMenu = document.getElementById('nav-menu');
		navMenu.classList.toggle('open');

	});
});