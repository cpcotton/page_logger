# for python

# this collects the file names and locations for a simple html log [page

def page_record(fd_name,name,subdir):
    if not fd_name.endswith(".html"):
        fd_name += ".html"
    global page_counter
    file_lines = getlines(fd_name)
    lines = len(file_lines)
    size = os.path.getsize(fd_name)
    
    # get source 
    here = r"C:\xampp\htdocs"
    frame = inspect.currentframe().f_back
    full_local_name  = inspect.getfile(frame)
    web_name = fd_name.replace(here,'')
    app_files_name = os.path.basename(full_local_name)

    line_number = frame.f_lineno
    html_page = {
            "file_name":name,
            "full_name":web_name,
            'subdir': subdir,
            "size": size,
            'lines': line_number,
            "base": (str(line_number) +': ' + str(app_files_name)), # process base making it
     }
    global pages_made
    pages_made.append(html_page)
    return 

# in the code 

# call with 
subdir = 'text' 
name =  ' filename.html'
fd_name = os.path.join(dir_website, subdir, name)
page_record( fd_name, name, subdir)


# now go to the here = r"C:\xampp\htdocs" or where your site is
# the pages are listed and linked with the HTML code (in another file)


