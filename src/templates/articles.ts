import ejs from 'ejs';

export default ejs.compile(
    `
  <% CoremediaCollection.items.forEach(function(item) { %>
    <% if (item) { %>
      <table border='0' cellpadding='0' cellspacing='0' class='abc_full_width' role='presentation' width='100%'>
        <tr>
          <td align='center' class='paddingLR_20' style='padding: 2px 0 2px 0;' valign='top'>
            <% for (let l = item.featuredMedia.length, i = 0; i < l; i++) { %>
                <% media = item.featuredMedia[i]%>
                <% if (media.docType ===  'imageproxy') { %>
                  <img alt='' data-assetid='' height='398' src='<%= media.picture.cropInfo[0].value[0].url  %>' style='display: block; padding: 0px; height: 398px; width: 600px; text-align: center; border: 0px none transparent;' width='600' />
                  <% break %>
                <% } %>
            <% } %>
            <table align='center' border='0' cellpadding='0' cellspacing='0' class='abc_full_width' role='presentation' style='width: 600px;' width='600'>
              <tr>
                <td align='left' bgcolor='#ffffff' style='padding: 30px 20px 25px; background-color: #ffffff;' valign='middle'>
                  <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                    <tr>
                      <td align='center' bgcolor='#ffffff' valign='middle'>
                      <table align='center' border='0' cellpadding='0' cellspacing='0' class='abc_full_width' role='presentation' style='width:546px;' width='546'>
                        <tr>
                        <td align='center' bgcolor='#ffffff' style='background-color: #ffffff; color: #000; text-align: left; padding-left:10px; padding-right:10px;' valign='middle'>
                          <font face='Arial, sans-serif'>
                            <span style='font-size:37.3333px'>
                              <b>
                                <%= item.shortTeaserTitle %>
                              </b>
                            </span> 
                          </font>
                        </td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                  </table>
                  <table align='center' border='0' cellpadding='0' cellspacing='0' class='abc_full_width' role='presentation' style='border-radius:0px; font-size:20px;background-color: #ffffff;  color: #808285' width='100%'>
                    <tr>
                      <td align='center' class='abc_full_width' style='padding-top: 20px; line-height: 140%; font-family: Helvetica, sans-serif; font-size:16px; color:#000'>
                        <div style='text-align: left; font-family: Helvetica, sans-serif;'>
                          <p>
                            <%= item.teaserTitle %>
                            <br>
                            <br>
                            <span style='font-family:Calibri,sans-serif'>
                              <span style='color:black'>
                                <%= item.teaserText.plainText %>
                              </span>
                            </span>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table><% } %><% }); %>`.replace(/\n\s+/g, '')
);
